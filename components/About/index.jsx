import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <div className="pb-10 mx-28">
      <div className="flex bg-blue-50 gap-x-[70px] items-center rounded-xl">
        <div className="w-full">
          <Image src={'/image/image1.png'} width={628} height={520} alt="img" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-[40px] font-semibold text-black pb-5">Discover our History</h1>
          <div className="flex flex-col gap-y-6">
            <p className="text-[#555] text-base font-normal w-3/4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
            <p className="text-[#555] text-base font-normal w-3/4">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
          <button className="bg-blue-600 text-white py-3 mt-9 w-[24%] rounded-full">Explore More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
