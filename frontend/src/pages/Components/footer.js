import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
      <div className="bg-[#283282] py-10">
        
        <div className="px-[50px] sm:px-[100px] sm:flex justify-between">
          
          
          <div className="cursor-pointer sm:flex sm:space-x-6 space-y-6 sm:space-y-0 font-semibold sm:text-[16px]">
            <h1 className="hover:underline">Contact Us</h1>
            <h1 className="hover:underline">Privacy Policy</h1>
            <h1 className="hover:underline">FAQs</h1>
            <Link href="/AboutUs">
            <h1 className="hover:underline">About us</h1>
            </Link>
          </div>

          <div className="pt-[40px] sm:pt-[0px]">
            <Link   href="/">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
            </Link>
          </div>
  
        </div>
      </div>
    );
  }
  