# MINTIFY: ERADICATING POVERTY WITH BLOCKCHAIN TECHNOLOGY THROUGH EDUCATION AND EMPOWERMENT

The right knowledge has the power to eradicate poverty, and the right education and empowerment gives access to the right knowledge. 

## Project Overview
Imagine a world where educational and empowerment resources can be minted as NFTs and claimed by anyone at zero cost through the power of blockchain technology. Economic barriers no longer limit individuals' potential to learn, grow, and be celebrated for their achievements. A world where education and empowerment are accessible and affordable, regardless of financial or social constraints. This is the world MINTIFY has created—a world where poverty does not exist. MINTIFY is a decentralised platform developed to eliminate poverty by providing affordable access to quality education that exposes underserved communities and individuals to the right information and skills needed to create financial fortune and thrive—especially in this era where technology has changed the game.

Through strategic partnerships with academic institutions, NGOs, community leaders, and nonprofit organisations, Mintify enables the issuance of academic courses, certificates, degrees, awards, and community recognitions. These can be minted as NFTs by the issuing bodies on the Mintify platform. With a streamlined, on-chain process, Mintify allows for bulk minting and distribution of these digital assets at a fraction of traditional costs—more than 500% more affordable.

On Mintify, issuing bodies can access the "MINT Asset" section to upload pre-designed courses, certificates, awards, or other recognitions in bulk. Recipients connect their wallets and visit the "Claim Asset" section, where they can verify eligibility by entering their wallet address. If eligible, they are guided through a few simple steps to claim their digital asset, whether it be a course completion certificate or a community award. If not eligible, they are prompted to check back in the future.

MINTIFY is more than just a platform; it is a gateway to financial fortune.

## Features
- **Seamless Certificate, Award, and Ticket Minting**: MINTIFY allows users to create and mint certificates, awards, and tickets in bulk using a CSV upload system. This removes the manual effort involved in creating digital assets individually.
  
- **Dynamic Data Insertion**: By automatically pulling information from uploaded CSV files, Mintify can personalize certificates for each recipient, ensuring accuracy and efficiency.
  
- **NFT-Based Proof of Achievement**: Every certificate, award, or ticket is minted as an NFT, ensuring transparency, immutability, and verifiability on the blockchain.
  
- **User-Friendly Dashboard**: An intuitive user interface allows users to manage their NFTs, view issuance history, and track recipient engagements.
  
- **Wallet Integration**: Recipients can store their certificates, awards, and tickets in their crypto wallets, enabling easy access, verification, and sharing.

## MINTIFY Workflow
### How It Works:

#### For Educational Institutions, NGO’s, Non Profits, Project/Community Owners:
Step 1: Visit the MINTIFY platform and connect your ………. wallet.
Step 2: Locate and click on the “MINT ASSET’ button in the hero section or menu.
Step 3: Upload the Asset you want to mint as an NFT  e.g A new course, Certificates, digital award etc 
Step 4: Upload a CSV file with recipients' details:
Full name (First Name, Last Name)
Wallet address
Step 5: Submit the asset and CSV file to generate NFTs for each recipient.
Step 6: You’ll Receive a  Mint Hash. Share it with your community members/recipients to claim their Assets as NFTs. 

#### For Recipients:
Step 1: Visit the platform and Connect your Metamask Wallet
Step 2: Locate and click on the “Claim Asset” button in the Hero Section or Menu.
Step 3: Paste the Mint Hash you received from your community leader/Founder etc.
Step 4: If eligible, you can claim the NFT directly to your wallet with a single click.
Step 5: After claiming, a link will be generated, allowing you to view the NFT (courses, certificate, award, or ticket) on platforms like OpenSea.
Step 6: Congratulations! Download your NFT/Save to your device. 

## Tools & Technology

### 1. Wagmi
Wagmi is a React-based library that simplifies Ethereum interactions, particularly for building decentralized applications (dApps). It provides hooks for connecting wallets, interacting with smart contracts, and managing blockchain data.

**Why it's used**:
- To allow users to connect their wallets (such as MetaMask or Coinbase Wallet) to the dApp.
- To get the current connected account's address.
- For sending write transactions to smart contracts.
- For reading transactions from the contract and so on.

This allows the dApp to easily connect to the blockchain and interact with smart contracts, such as minting NFTs.

### 2. Pinata
Pinata is a service that provides easy-to-use API access to the InterPlanetary File System (IPFS), a decentralized storage network. It allows for storing files like images, videos, and metadata on IPFS, which is commonly used for NFT data.

**Why it's used**:
- To upload both image files and metadata files (JSON) to IPFS. This is crucial for decentralized storage of the image and metadata related to each NFT. IPFS ensures that the files remain accessible across the network without relying on a centralized server.

### 3. Merklejs
Merkle trees are cryptographic structures that allow efficient and secure verification of large datasets. In this case, the StandardMerkleTree from OpenZeppelin’s Merkle Tree library helps create a Merkle tree from a set of addresses and indexes.

**Why it's used**:
- Used to generate a Merkle root from the parsed CSV data (the recipient wallet addresses). The Merkle root is used in smart contracts to verify that an address is eligible to mint an NFT, based on the pre-approved addresses from the CSV file. It makes the verification process more efficient and secure.

### 4. OnchainKit
Mintify leverages OnchainKit to simplify the process of minting NFTs. It integrates wallet connections via Coinbase wallet and utilizes Wagmi for efficient blockchain data management. The app displays user-friendly information such as base names and smart wallet details. By harnessing the power of OnchainKit, the application streamlines the entire mintification process, making it accessible and straightforward for users to turn their assets into NFTs.

### 5. PapaParse
PapaParse is a JavaScript library for parsing CSV files in the browser or Node.js. It allows easy processing and manipulation of CSV data without needing to convert it manually.

**Why it's used**:
- Used to parse the uploaded CSV file containing recipient wallet addresses and names. This allows the data to be used in the minting process, where each row represents a recipient who may be eligible to mint an NFT. The library simplifies reading and processing the CSV structure, turning it into a workable JavaScript object.

### 6. Keccak256
Keccak256 is a cryptographic hash function used primarily in Ethereum to create fixed-size hashes from input data. It’s commonly used to verify data integrity or generate proofs.

**Why it's used**:
- Keccak256 is being used in the Merkle tree generation or within the smart contract to hash input data, such as wallet addresses or transaction details. In this case, it's used as part of the process to generate the Merkle root and verify Merkle proofs, ensuring that an address is part of the approved list for minting the NFT.

## Problem Addressed
MINTIFY addresses the challenges community owners and project leaders face when issuing certificates and rewards to their members. Traditionally, the process is time-consuming and costly, especially when designing individual certificates for large groups. This often leads to delays and increased expenses, which hinder the recognition of achievements and community engagement. 

## Leveraging BASE Blockchain Technology
At its core, MINTIFY leverages blockchain technology to revolutionize the way communities, institutions, and event organizers issue certificates and awards. By minting these credentials as NFTs, Mintify guarantees transparency, immutability, and easy verification for both issuers and recipients.

## LINKS
- **UI/UX DESIGN**: (https://www.figma.com/design/apt4FarFoGY5jwnhyluk9w/MINTIFY-(MINTIFY---GEF-HACKATHON)?node-id=0-1&node-type=canvas)
- **GITHUB**: [GitHub Repository](https://github.com/KoxyG/MinTify/blob/main/frontend/src/pages/Mint/index.js)
- **SMART CONTRACT ADDRESS VERIFIED**: [BaseScan](https://sepolia.basescan.org/address/0x798bb21202a27f0A45806ba3C4D4f87cba3DC259#code)
- **CODE**: [Code on GitHub](https://github.com/KoxyG/MinTify/blob/main/frontend/src/pages/Mint/index.js)

## Contact
For more information about Mintify or for support, reach out to us at:
- **Email**: Hello.mintify@gmail.com
- **Website**: [Mintify Website](https://min-tify.vercel.app/)

## Acknowledgments
We would like to express our heartfelt gratitude to the blockchain community and all the developers whose efforts have made blockchain and NFT technology accessible to everyone. Your dedication to innovation and collaboration inspires us as we work on Mintify and strive to empower communities across Africa. Thank you for your invaluable contributions to this evolving space.
