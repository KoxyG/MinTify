import { useState, useEffect } from "react";
import { coinbaseWallet } from 'wagmi/connectors';
import { base, baseSepolia } from 'wagmi/chains';
import { useMintifyContext } from "../../Context/mintifyContext";
import {useConnect, useAccount, useReadContract} from "wagmi";
import axios from "axios"; 
import { parse } from "papaparse";
import keccak256 from "keccak256";// Keccak hashing function
import { MerkleTree } from "merkletreejs";
import { motion } from "framer-motion";
import { X, Check, Copy,  Loader, AlertTriangle } from 'lucide-react'


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Eligibility() {
  const [contractAddress, setContractAddress] = useState("");
  const [loading, setLoading] = useState("");
  const [csvData, setCsvData] = useState(null);
  const [merkleTree, setMerkleTree] = useState(null);
  const [rootHash, setRootHash] = useState(null);
  const { address: userAddress } = useAccount();
  const [isEligible, setIsEligible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const [isModalLoading, setIsModalLoading] = useState(false);


  const { data: csvUri, refetch } = useReadContract({
    abi: [
      {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "contractToCid",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }],
    address: "0x798bb21202a27f0A45806ba3C4D4f87cba3DC259",
    functionName: 'contractToCid',
    args:  [
      contractAddress
    ],
    enabled: false
  })

  useEffect(() => {
    // Check if all required fields are filled
    const isValid = address && contractAddress;
    setIsFormValid(isValid);
  }, [contractAddress]);



  const handleChange = (event) => {
    switch (event.target.name) {
      case "contractAddress":
        setContractAddress(event.target.value);
        break;
      default:
        break;
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setIsModalLoading(true);
    setShowModal(true);

    if (!isFormValid) {
      toast.error("Please fill all required fields before submitting.");
      return;
    }

    

    try {

      const { data: csvUri } = await refetch();
      console.log("Retrieved CSV URI from contract:", csvUri); 


      // if (!csvUri) {
      //   alert("CSV URI not found for the provided address.");
      //   setLoading(false);
      //   return;
      // }

      const response = await axios.get(csvUri);
      console.log("Raw CSV data:", response.data); // Log the raw CSV data


      const parsedData = parse(response.data, { header: true }).data;
      console.log("Parsed CSV data:", parsedData); // Log parsed CSV

      setCsvData(parsedData);
      // alert("CSV data fetched successfully.");


      const addresses = parsedData.map((entry) =>
        entry["Wallet Address"].toLowerCase()
      );
  
      // Generate Merkle Tree
      const leaves = addresses.map((addr) =>
        keccak256(addr).toString("hex")
      );
      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const root = merkleTree.getHexRoot();
  
      console.log("Merkle Root:", root);
  
      // Generate proof for the connected wallet address
      const leaf = keccak256(userAddress.toLowerCase()).toString("hex");
      const proof = merkleTree.getHexProof(leaf);
  
      console.log("Generated Proof:", proof);
  
      const isEligible = merkleTree.verify(proof, leaf, root);
      console.log("Is Eligible:", isEligible);

    

      setIsEligible(isEligible);
      // setShowAlert(true);
      setShowModal(true);
      
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
      setError(error.message);
      setShowAlert(true);
    
  
}  finally {
  setLoading(false);
  setIsModalLoading(false);
}

    

  }

  const closeModal = () => {
    setShowModal(false);
    setError(null);
    setIsModalLoading(false);
  };

  return (

    <div className="bg-[#131c61]">
      <div className="relative" style={{ backgroundImage: "url('bgDesk.png')" }}>

      {/* Hero */}
      <div className="px-[50px] py-[50px]  text-center sm:px-[100px]"  >
        
        
        <div className="grid ">
          <h1 className="text-[45px] pt-[20px] text-[30px] sm:text-[40px] font-extrabold"> Empowering Communities, <br /> Celebrating Achievements!</h1>

          <p className="py-4 text-[#b2b0c6] text-[10px] sm:text-[13px] ">
            NFT Minting Platform for Community Certificates, Awards, and Tickets
            and more
          </p>
         
        </div>

      </div>
    </div>

      <h2 className="font-semibold	text-[36px] text-center py-[100px]">Check Eligibility</h2>

      <div className="w-full max-w-4xl mx-auto items-center justify-center flex flex-col pb-5">
      <form className="shadow-md rounded-lg px-8 pb-[50px] flex flex-col w-full" onSubmit={handleSubmit}>
        <div className="pb-5 appearance-none w-full">
          <label
            className="block text-white sm:text-[20px] pb-2 font-semibold leading-snug"
            htmlFor="address"
          >
            Mint Hash
          </label>
          <input
            className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
            id="address"
            type="text"
            name="contractAddress"
            value={contractAddress}
            onChange={handleChange}
            placeholder="Enter your mint hash"
          />
        </div>
        <motion.div whileHover={isFormValid ? { scale: 1.1 } : {}}
  transition={{ type: "spring", stiffness: 400, damping: 10 }} className={`px-5 py-2.5 rounded-full justify-center items-center gap-2 inline-flex ${isFormValid ? 'bg-[#8080d7]' : 'bg-gray-400 cursor-not-allowed'}`}>
          <button
            type="submit"
            className="text-white cursor-pointer w-full py-2 text-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Checking..pls wait" : "Check Eligibility"}
          </button>
        </motion.div>
      </form>


      

      
    </div>

    {showModal && (
        <div className="fixed inset-0 bg-[#131c61] bg-opacity-80 flex items-center justify-center">
          <div className="bg-[#0c0e28] border border-white p-8 rounded-lg  max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end">
              <button onClick={closeModal} disabled={isModalLoading}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {isModalLoading ? (
              <div className="text-center">
                <Loader className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-lg font-medium">Eligibility checking in progress...</p>
                <p className="text-sm text-gray-400 mt-2">Please wait while we process your request.</p>
              </div>
            ) : error ? (
              <>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Unfortunately, you are not eligible for this NFT at this time</h3>
                <p className="text-sm text-gray-400 mb-4">{error}</p>
              </>
            ) : isEligible ? (
              <>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Congratulations, you are eligible</h3>
                <p className="text-sm text-gray-400 mb-4">
                Claim Your Certificate
                </p>
                <div className="grid  bg-navy-700 rounded px-3 py-2 mb-4">
                  <span className="text-sm py-3 text-white">Mint Hash: {mintHash}</span>
                  <button
                    onClick={copyToClipboard}
                    className="focus:outline-none"
                    aria-label="Copy mint hash"
                  >
                    {isCopied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {/* {isCopied && (
                  <p className="text-sm text-green-500 mt-2">Copied to clipboard!</p>
                )} */}
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
