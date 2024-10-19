import { useState } from "react";
import { FileIcon } from "@radix-ui/react-icons";
import Papa from "papaparse";
import { pinata } from "@/Constants/pinata";


import {useConnect, useAccount, useWriteContract} from "wagmi";
import { coinbaseWallet } from 'wagmi/connectors';
import { base, baseSepolia } from 'wagmi/chains';
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { useMintifyContext } from "../../Context/mintifyContext";


import { motion } from "framer-motion";



export default function Mint() {

  const {connectAsync } = useConnect();
  const { address } = useMintifyContext();
  const { writeContractAsync } = useWriteContract();

  const [info, setInfo] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState("");
  const [fileName, setFileName] = useState("");
  const [csvFile, setCsvFile] = useState("");
  const [csvFileName, setCsvFileName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [merkleRoot, setMerkleRoot] = useState(null); // To store the generated Merkle root

  

  
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setImageFile(file);
    }
  };


  const handleCsvChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCsvFile(file);
      setCsvFileName(file.name);
    }
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "info":
        setInfo(event.target.value);
        break;
      case "tag":
        setTag(event.target.value);
        break;
      default:
        break;
    }
  };

  const uploadImageToIPFS = async () => {
    if (!imageFile) {
      throw new Error("No image file selected");
    }
  
   

    const buffer = await imageFile.arrayBuffer();
    // Create a new File object
    const file = new File([buffer], imageFile.name, { type: imageFile.type });
    
  
    const response = await pinata.upload.file(file);
    return response.IpfsHash;
  };

  const handleProcessCsv = () => {
    return new Promise((resolve, reject) => {
      if (!csvFile) {
        reject(new Error("No CSV file selected"));
        return;
      }

      Papa.parse(csvFile, {
        complete: (results) => {
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        },
        header: true
      });
    });
  };



  const generateMerkleRoot = (values) => {
     const formattedValues = values
    .filter((row) => row["Wallet Address"] && row["Wallet Address"].trim() !== "") // Ensure valid address exists
    .map((row, index) => {
      return [row["Wallet Address"].trim(), index]; // Address and index
    });


    const tree = StandardMerkleTree.of(formattedValues, ["address", "uint256"]);
    console.log("Generated Merkle Root:", tree.root);
    return tree.root;
  };


  const processImage = async (file, userName) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userName', userName);

    const response = await fetch('/api/process-image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to process image');
    }

    return await response.arrayBuffer();
  };
  

const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);
  
  console.log("Form submitted with the following details:");
  console.log("Image file:", fileName);
  console.log("CSV file:", csvFileName);
  console.log("Tag:", tag);
  console.log("Community-specific information:", info);

  


  try {

    if(!address){ 
      await connectAsync({chainId: baseSepolia.id, connector: coinbaseWallet({appName: 'Mintify'})});
    }

    // Step 1: Upload image to IPFS
    const imageCID = await uploadImageToIPFS();
    console.log("Image uploaded to IPFS with CID:", imageCID);

    // Create IPFS URL for the image
    const imageUrl = `https://ipfs.io/ipfs/${imageCID}`;

    // Step 2: Process the CSV file
    const processedCsv = await handleProcessCsv();

    const merkleRoot = generateMerkleRoot(processedCsv); // Generate Merkle root
    setMerkleRoot(merkleRoot);

    console.log("Merkle Root generated:", merkleRoot);

    // Step 3: Process each CSV row, upload metadata, and add Token URI to each row
    const updatedCsv = [];
    for (let i = 0; i < processedCsv.length; i++) {
      const row = processedCsv[i];

      
      const processedImageBuffer = await processImage(imageFile, row.Name);

      // Upload the processed image to IPFS
      const processedImageFile = new File([processedImageBuffer], `${row.Name}_processed.png`, { type: 'image/png' });
      const processedImageResponse = await pinata.upload.file(processedImageFile);
      const processedImageUrl = `https://ipfs.io/ipfs/${processedImageResponse.IpfsHash}`;
  
      // Create metadata for each recipient
      const metadata = {
        name: `${row.Name}'s NFT Certificate`,  // NFT title
        description: `Award for ${row.Name}`,    // Description of the NFT
        image: processedImageUrl,  // IPFS URL for the image
        attributes: [     // Optional: include attributes
          {
            trait_type: "Recipient Name",
            value: row.Name
          },
          {
            trait_type: "Wallet Address",
            value: row["Wallet Address"]
          }
        ]
      };

      // Upload the metadata to Pinata
      const jsonData = {
        pinataContent: metadata,
        pinataMetadata: {
          name: `${row.Name}-nft-metadata`,
          description: `Metadata for ${row.Name}'s NFT`,
        },
      };

      const jsonUploadResult = await pinata.upload.json(jsonData);
      const metadataCID = jsonUploadResult.IpfsHash;
      const tokenURI = `https://ipfs.io/ipfs/${metadataCID}`;
  
      console.log(`Metadata for ${row.Name} uploaded to IPFS with CID: ${metadataCID}`);
      
      // Add Token URI to the CSV row
      updatedCsv.push({
        ...row,
        TokenURI: tokenURI
      });
    }

    console.log("Updated CSV with Token URIs:", updatedCsv);

    // Step 4: Convert the updated CSV data back to a CSV format
    const updatedCsvString = Papa.unparse(updatedCsv);

    // Step 5: Upload the updated CSV to Pinata
    const updatedCsvFile = new Blob([updatedCsvString], { type: "text/csv" });
    const csvUploadResult = await pinata.upload.file(updatedCsvFile);
    const csvUri = `https://ipfs.io/ipfs/${csvUploadResult.IpfsHash}`;
    
    console.log("Updated CSV uploaded to IPFS with URI:", csvUri);

    const data = await writeContractAsync({
      chainId: baseSepolia.id,
      address: '0x798bb21202a27f0A45806ba3C4D4f87cba3DC259',
      functionName: 'createMintify',
      abi: [{
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "merkleRoot",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "CsvCid",
                "type": "string"
            }
        ],
        "name": "createMintify",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }],
    args: [
      address,
      tag,
      info,      
      merkleRoot,
      csvUri   
    ],
    })

    console.log("data", data)
    alert(`Transaction submitted: ${data}`); //alert of the tx hash


  } catch (error) {
    console.error("Error processing and uploading data:", error);
  }

  setLoading(false);
};

  return (
    <div className="">
      <div
        className="bg-[#131c61] relative brightness-150 bg-blend-hue"
      >
        {/* Hero */}
        <div className="px-[50px] py-[50px]  text-center sm:px-[100px]">
          <div className="grid ">
            <h1 className="text-[45px] pt-[20px] text-[30px] sm:text-[40px] font-extrabold">
               Empowering Communities, <br /> Celebrating Achievements!
            </h1>

            <p className="py-4 text-[#b2b0c6] text-[10px] sm:text-[13px] ">
              NFT Minting Platform for Community Certificates, Awards, and
              Tickets and more
            </p>
          </div>
        </div>
      </div>

      <h2 className="font-semibold	text-[36px] text-center py-[100px]">Mint</h2>

      <div className="w-full max-w-4xl mx-auto items-center justify-center flex flex-col pb-5">
        <form
          className="shadow-md rounded-lg px-8 pb-[50px] flex flex-col w-full"
          onSubmit={handleSubmit}
        >
          {/* Upload image */}
          <div className="pb-5 appearance-none w-full">
            <label
              className="block text-white sm:text-[20px] pb-2 font-semibold leading-snug"
              htmlFor="address"
            >
              Upload Image
            </label>
            <label
              htmlFor="image-upload"
              className="block w-full px-4 py-2 bg-white text-[#27289d] rounded-lg shadow-lg  cursor-pointer hover:bg-green-50  transition-all duration-300 ease-in-out text-right"
            >
              <span className="text-sm text-[#27289d] font-semibold">
                {fileName || "Select file"}
              </span>
              <input
                id="image-upload"
                type="file"
                className="hidden border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                accept="image/*"
                placeholder="e.g., certificate design, event ticket, or award"
                onChange={handleFileChange}
              />
            </label>
            {fileName && (
              <p className="mt-2 text-sm text-gray-500 text-center">
                Selected file: {fileName}
              </p>
            )}
            <label
              className="block text-[#b4b5be] sm:text-[13px] pb-2 font-semibold leading-snug"
              htmlFor="address"
            >
              e.g., certificate design, event ticket, or award
            </label>
          </div>

          {/* Upload CSV */}
          <div className="pb-5 appearance-none w-full">
            <label
              className="block text-white sm:text-[20px] pb-2 font-semibold leading-snug"
              htmlFor="address"
            >
              Details in a CSV file
            </label>
            <label
              htmlFor="csv-upload"
              className="flex items-center justify-between px-4 py-2 bg-white text-[#27289d] rounded-lg shadow-lg border border-[#27289d] cursor-pointer hover:bg-green-50 transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center">
                <FileIcon className="w-5 h-5 mr-2" />
                <span className="text-sm font-semibold">CSV File</span>
              </div>
              <span className="text-sm font-semibold">
                {csvFileName || "Select file"}
              </span>
              <input
                id="csv-upload"
                type="file"
                className="hidden"
                accept=".csv"
                onChange={handleCsvChange}
              />
            </label>
            {csvFileName && (
              <p className="mt-2 text-sm text-gray-600 text-center">
                Selected file: {csvFileName}
              </p>
            )}
            <label
              className="block text-[#b4b5be] sm:text-[13px] pb-2 font-semibold leading-snug"
              htmlFor="address"
            >
              This file should contain the full names of the recipients (first &
              last name)and their wallet addresses
            </label>
          </div>

          <div className="pb-5 appearance-none w-full">
            <label
              className="block text-white sm:text-[20px] pb-2 font-semibold leading-snug"
              htmlFor="tag"
            >
              Tag
            </label>
            <input
              className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
              id="tag"
              type="text"
              name="tag"
              value={tag}
              onChange={handleChange}
              placeholder="Enter one tag in form of a acronym"
            />
          </div>

          {/* Community information */}
          <div className="pb-5 appearance-none w-full">
            <label
              className="block text-white sm:text-[20px] pb-2 font-semibold leading-snug"
              htmlFor="info"
            >
              Community-specific information
            </label>
            <input
              className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
              id="info"
              type="text"
              name="info"
              value={info}
              onChange={handleChange}
              placeholder="e.g., course name, award type, etc."
            />
          </div>

          <motion.div whileHover={{ scale: 1.1 }}
  transition={{ type: "spring", stiffness: 400, damping: 10 }} className="bg-[#8080d7] px-5 py-2.5 rounded-full justify-center items-center gap-2 inline-flex">
            <button
              type="submit"
              className="text-white cursor-pointer w-full py-2 text-lg font-semibold"
              disabled={loading}
            >
              {loading ? "Minting..pls wait" : "Mint"}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
