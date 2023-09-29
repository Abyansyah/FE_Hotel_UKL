import Image from 'next/image';
import React from 'react';
import data from 'data/facility.json';

const Facility = () => {
  return (
    <div className="pb-28 mx-28">
      <div className="flex w-full gap-6">
        <div className="flex flex-col gap-y-5 w-2/4">
          <h1 className="font-semibold text-[40px]">We do our best facilities provide you</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy </p>
          <button className="bg-blue-600 text-white rounded-full w-1/3 py-3">Contact Now</button>
        </div>
        <div className="flex flex-wrap gap-6 w-full">
          {data?.map((item, index) => (
            <div className="flex flex-col w-[193px] h-[193px] border border-[#E8E8E8] justify-center items-center gap-y-6 rounded hover:shadow-lg  duration-300" key={index}>
              <Image src={item?.img} width={40} height={40} alt={item?.name} />
              <p>{item?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facility;
