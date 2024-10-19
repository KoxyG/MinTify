import Image from "next/image";
import {motion} from "framer-motion";

export default function Features() {
    return (

      <div className=" px-[50px] sm:px-[100px] bg-[#131c61] pb-[50px]">
        {/* Hero */}
        <div className="bg-white/5 rounded-lg p-[50px] border border-[#4d52a0] ">
          <h1 className="text-center text-white font-extrabold text-[36px] sm:text-[42px] pb-[30px]">FEATURES</h1>

          {/* first */}
         <motion.div className="sm:flex justify-around pb-[150px]  space-y-[50px] sm:space-x-[100px]">
         <Image src="/img1.png" alt="img" width={1180} height={326} />

          <div className="grid text-center sm:text-left">
            <h3 className="font-semibold text-white text-[20px] sm:text-[32px] pb-[10px]">Fully Onchain Process</h3>
            <p className="text-[15px] sm:text-[20px]  text-[#b2b0c6] font-normal">The platform is built entirely on the Base blockchain, ensuring decentralisation and transparency. All transactions, from eligibility verification to minting, are handled onchain via smart contracts, eliminating manual interventions.</p>
          </div>

         </motion.div>

         {/* second */}

         <div className="sm:flex justify-around pb-[150px] space-y-[50px] sm:space-x-[100px] ">
         

          <div className="grid text-center sm:text-left py-[50px]">
            <h3 className="font-semibold text-white text-[20px] sm:text-[32px] pb-[10px]">Integration with Basenames and Smart Wallet</h3>
            <p className="text-[15px] sm:text-[20px] text-[#b2b0c6]  font-normal">The platform integrates Basenames to simplify onchain identity management and Smart Wallet to make it easy for recipients to mint NFTs directly to their wallets. This ensures a seamless experience, even for users who may not be familiar with onchain processes.</p>
          </div>

          <Image src="/img2.png" alt="img" width={1180} height={326} />

         </div>

         {/* third */}

         <div className="sm:flex justify-around pb-[150px]  space-y-[50px] sm:space-x-[100px]">
         <Image src="/img3.png" alt="img" width={1080} height={326} />

          <div className="grid text-center sm:text-left">
            <h3 className="font-semibold text-white text-[20px] sm:text-[32px] pb-[10px]">Personalization and Customization</h3>
            <p className="text-[15px] sm:text-[20px] text-[#b2b0c6] font-normal">Project owners can personalize certificates or digital assets with specific details such as recipient names, dates, and metadata before minting, adding a unique touch to each NFT.</p>
          </div>

         </div>

         {/* fourth */}
         <div className="sm:flex justify-around pb-[150px] space-y-[50px] sm:space-x-[100px]">
         

         <div className="grid text-center sm:text-left py-[50px]">

           <h3 className="font-semibold text-[20px] text-left text-white sm:text-[32px] pb-[10px]">Streamlined Recipient Experience</h3>
           <p className="text-[15px] sm:text-[20px] text-left text-[#b2b0c6]  font-normal">For recipients, the claiming process is user-friendly and intuitive. They simply check their eligibility, and if eligible, mint the NFT with one click. Wallet integration is simplified by supporting popular options like MetaMask and WalletConnect.</p>

         </div>

         <Image src="/img4.png" alt="img" width={1180} height={326} />

        </div>
        
        </div>
      </div>
    );
  }
  