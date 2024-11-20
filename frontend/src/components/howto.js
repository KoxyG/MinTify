import Link from "next/link";
import Image from "next/image";

export default function HowTo() {
    return (
      <div className="py-10 bg-[#131c61] px-[50px] sm:px-[100px] ">

        <h2 className="text-center text-white font-extrabold text-[36px] sm:text-[42px] pb-[30px]">HOW MINTIFY WORKS</h2>
        
        <div className="sm:flex my-4  justify-center gap-8">
            <Image src="/Group 503.png" alt="how" width={500} height={500} />
            <Image src="/Group 503.png" alt="how" width={500} height={500} />
        </div>
      </div>
    );
  }
  