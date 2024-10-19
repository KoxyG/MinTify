import { useState } from "react";
import {useAccount, useReadContract} from "wagmi";
import axios from "axios"; 
import { parse } from "papaparse";
import keccak256 from "keccak256";// Keccak hashing function
import { MerkleTree } from "merkletreejs";


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
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState("");
  const [csvData, setCsvData] = useState(null);
  const [merkleTree, setMerkleTree] = useState(null);
  const [rootHash, setRootHash] = useState(null);
  const { address: userAddress } = useAccount();
  const [isEligible, setIsEligible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);



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
      address
    ],
    enabled: false
  })



  const handleChange = (event) => {
    switch (event.target.name) {
      case "address":
        setAddress(event.target.value);
        break;
      default:
        break;
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {

      const { data: csvUri } = await refetch();
      console.log("Retrieved CSV URI from contract:", csvUri); 


      if (!csvUri) {
        alert("CSV URI not found for the provided address.");
        setLoading(false);
        return;
      }

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
      setShowAlert(true);
  
      
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
      setError(error.message);
      setShowAlert(true);
    
  } finally {
    setLoading(false);
  }

    

  }

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
            name="address"
            value={address}
            onChange={handleChange}
            placeholder="Enter your mint hash"
          />
        </div>
        <div className="bg-[#8080d7] px-5 py-2.5 rounded-full justify-center items-center gap-2 inline-flex">
          <button
            type="submit"
            className="text-white cursor-pointer w-full py-2 text-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Checking..pls wait" : "Check Eligibility"}
          </button>
        </div>
      </form>


      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{error ? "Error" : "Eligibility Status"}</AlertDialogTitle>
              <AlertDialogDescription>
                {error ? error : (
                  isEligible
                    ? "Congratulations! You are eligible for minting."
                    : "Sorry, you are not eligible for minting at this time."
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowAlert(false)}>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      
    </div>
    </div>
  );
}
