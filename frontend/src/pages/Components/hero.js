import Link from "next/link";
import Image from "next/image";
import { useMintifyContext } from "../../Context/mintifyContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";

export default function Hero() {
  const { address } = useMintifyContext();
 
  const handleButtonMint = (e) => {
    if (!address) {
      e.preventDefault();
      toast.error('Please connect your wallet first!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleButtonEligibility = (e) => {
    if (!address) {
      e.preventDefault();
      toast.error('Please connect your wallet first!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (

    <div >
      {/* Hero */}
      <div className="relative" style={{ backgroundImage: "url('bgDesk.png')" }}>
       
       
        <div className="px-[50px] sm:px-[100px] sm:flex pb-[70px]">
          <div>
            <div className="pt-[10px] ">
              <h1 className="text-start text-[45px] sm:text-[60px] font-extrabold">
                <span className="text-white">Empowering Communities, </span><span className="text-[#d2d7ff]">Celebrating Achievements!</span>
              </h1>
              

              <p className="py-4 sm:text-left text-[#b2b0c6] text-[12px] sm:text-[16px] ">
                NFT Minting Platform for Community Certificates, Awards, Tickets
                and more
              </p>
              <div className="flex justify-items-start space-x-4 text-[15px] sm:text-[20px] text-white pt-[30px]">
                <Link href="/Mint" passHref>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <button
                      onClick={handleButtonMint}
                      className="rounded-full bg-[#8381d5]  px-4 py-3"
                    >
                      Mint NFT
                    </button>
                  </motion.div>
                </Link>

                <Link href="/Eligibility" passHref>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <button
                      onClick={handleButtonEligibility}
                      className="border-solid border-2 border-[#8381d5] rounded-full text-white px-2 py-3"
                    >
                      Check Eligibility
                    </button>
                  </motion.div>
                </Link>
              </div>

              <div className="py-10">
                <Image src="/copy.png" alt="image" width={336} height={69} />
              </div>

             
            </div>

          </div>

          <motion.div
            drag
            dragConstraints={{
              top: -50,
              left: -50,
              right: 50,
              bottom: 50,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              ease: [0.17, 0.67, 0.83, 0.67],
              duration: 2,
              x: { duration: 1 },
            }} className="pb-[40px]">
            <Image src="/certificate.png" alt="hero" width={880} height={326} />
          </motion.div>
        </div>


         {/* <motion.div
            drag
            dragConstraints={{
              top: -50,
              left: -50,
              right: 50,
              bottom: 50,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              ease: [0.17, 0.67, 0.83, 0.67],
              duration: 2,
              x: { duration: 1 },
            }}
            className="pb-[40px]"
          >
            <Image
              src="/certificate.png"
              alt="hero"
              width={1180}
              height={326}
            />
          </motion.div> */}

      </div>
      <ToastContainer />
    </div>
  );
}
