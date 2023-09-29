import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <div className="py-16 mx-28">
      <div className="flex gap-40 items-center">
        <div className="flex flex-col gap-y-8">
          <p className="w-1/2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <div className="flex gap-7">
            <Image src={'/icons/fb.svg'} width={16} height={16} alt="fb" />
            <Image src={'/icons/ig.svg'} width={16} height={16} alt="fb" />
            <Image src={'/icons/gg.svg'} width={16} height={16} alt="fb" />
          </div>
        </div>
        <div className="flex flex-col gap-y-6">
          <h1 className="text-[#222] font-normal text-2xl">Home</h1>
          <div className="flex flex-col gap-y-4">
            <p className="text-[#222] text-base font-normal">Booking</p>
            <p className="text-[#222] text-base font-normal">Facilities</p>
            <p className="text-[#222] text-base font-normal">Location</p>
            <p className="text-[#222] text-base font-normal">Contact</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-6">
          <h1 className="text-[#222] font-normal text-2xl">Help</h1>
          <div className="flex flex-col gap-y-4">
            <p className="text-[#222] text-base font-normal">About Us</p>
            <p className="text-[#222] text-base font-normal">Help Center</p>
            <p className="text-[#222] text-base font-normal">Pivacy policy</p>
            <p className="text-[#222] text-base font-normal">FAQs</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-6">
          <h1 className="text-[#222] font-normal text-2xl">Get the app</h1>
          <div className="flex flex-col gap-y-4">
            <p className="text-[#222] text-base font-normal">iOS app</p>
            <p className="text-[#222] text-base font-normal">Android app</p>
            <p>‎ </p>
            <p>‎ </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
