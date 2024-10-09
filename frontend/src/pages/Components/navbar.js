"use client";
import { useState } from "react";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  WalletDefault
} from "@coinbase/onchainkit/wallet";


export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // style={{ backgroundImage: "url('cover.png')" }}
  return (
    <div  className="bg-[#17123d] relative brightness-150 bg-blend-hue" >
      {/* NavBar */}
      <div className=" px-[50px] sm:px-[100px] py-[40px] flex justify-between">
        <div>
        <Link href="/">
          <h1>Logo</h1>
          </Link>
        </div>
        <div className="hidden sm:text-[#b2b0c6] sm:flex justify-center cursor-pointer gap-5">
          <Link href="/">
          <h1>Home</h1>
          </Link>
          <h1>Dashboard</h1>
          <h1>Features</h1>
        </div>

        <div className="grid">
        <WalletDefault />
        </div>

        <div className="md:hidden mb-4 ">
          <button className="text-dark" onClick={toggleMenu}>
            {isOpen ? <Cross2Icon /> : <HamburgerMenuIcon />}
          </button>
        </div>


      </div>

      {isOpen && (
        <div
          className="fixed z-20 top-0 bg-[#010922]
         right-0 bottom-0 left-0 flex flex-col 
         items-center gap-6 justify-center"
        >
          <button
            className="text-white absolute top-[60px] right-[40px]"
            onClick={toggleMenu}
          >
            <Cross2Icon className="text-2xl" />
          </button>

          <h3 className="text-white text-sm font-normal leading-none">
            <Link href="/">Home</Link>
          </h3>
          

          <h3 className="text-white text-sm font-normal leading-none">
          <Link href="/">
                  <button>Dashboard</button>
                </Link>
          </h3>
          
          <h3 className="text-white text-sm font-normal leading-none">
                <Link href="/">
                  <button>Features</button>
                </Link>
          </h3>


         
            <div className="flex">
            <WalletDefault />
            </div>
         
        </div>
      )}
    </div>
  );
}
