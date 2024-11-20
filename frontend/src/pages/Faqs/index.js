import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../Components/accordion";
export default function Faqs() {
  return (
    <div className="bg-[#131c61]">
      <div
        className="relative"
        style={{ backgroundImage: "url('bgDesk.png')" }}
      >
        {/* Hero */}
        <div className="px-[50px] py-[50px]  text-center sm:px-[100px]">
          <div className="grid ">
            <h1 className="text-[45px] pt-[20px] text-[30px] sm:text-[40px] font-extrabold">
               FAQs
            </h1>

            <p className="py-4 text-[#b2b0c6] text-[10px] sm:text-[13px] ">
              NFT Minting Platform for Community Certificates, Awards, Tickets
              and more
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white/5 px-[50px] sm:px-[100px] rounded-lg p-[50px] border border-[#4d52a0]">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Mintify?</AccordionTrigger>
            <AccordionContent>
              Mintify is a decentralised platform that enables community owners,
              project leaders, and event organisers to create and distribute
              NFTs in the form of certificates, awards, and event tickets. With
              Mintify, you can personalise, mint, and issue NFTs efficiently to
              large groups using blockchain technology.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Who can use Mintify?</AccordionTrigger>
            <AccordionContent>
              Anyone! Whether you're a community manager, project founder, event
              organiser, or simply someone looking to issue certificates,
              awards, or tickets as NFTs, Mintify is designed to cater to your
              needs. It's perfect for Web3 communities, educational programs,
              and event management.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              Do I need to be a designer to create certificates or awards?
            </AccordionTrigger>
            <AccordionContent>
              Not at all! You only need to upload a template or image design.
              Mintify will handle the personalization and minting process,
              eliminating the need for manual design for each recipient.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
            How do recipients claim their NFTs?
            </AccordionTrigger>
            <AccordionContent>
             Recipients can visit the platform, navigate to the section where their NFT is available, and check their eligibility by entering their wallet address. If they are eligible, they can mint their personalised certificate, award, or ticket directly on the platform.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
             Are there any hidden fees?
            </AccordionTrigger>
            <AccordionContent>
            No hidden fees! You only need to cover the blockchain's gas fees required to mint the NFTs. We’ll clearly show you the estimated cost before you proceed with minting.

            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
