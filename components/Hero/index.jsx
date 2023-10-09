import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useDateRange } from 'ahmad/context/datePicker';
import moment from 'moment';

const Hero = () => {
  const [tipe, setTipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { startDate, setStartDate, endDate, setEndDate } = useDateRange();

  const getTipeKamar = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/tipe/tipe');
      const data = response.data;
      setTipe(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getTipeKamar();
  }, []);

  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  return (
    <div className="py-28 mx-28">
      <div className="flex flex-col gap-y-5">
        <h1 className="font-semibold text-4xl text-black">Our most popular Hotels</h1>
        <div className="flex justify-between items-center">
          <p className="w-2/6 text-[#555]">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <button className="bg-blue-200 text-blue-700  py-[6px] px-7 rounded-full">View All</button>
        </div>
        <div className="flex justify-between">
          {isLoading
            ? tipe?.map((item, index) => (
                <div className="flex flex-col bg-[#FAFAFA] w-[380px] rounded-xl overflow-hidden" key={index}>
                  <SkeletonLoading />
                </div>
              ))
            : tipe?.map((item, index) => (
                <Link
                  href={`/hotel/${item.id}?tgl_check_in=${moment(startDate).format('YYYY-MM-DD')}&tgl_check_out=${moment(endDate).format('YYYY-MM-DD')}`}
                  className="flex flex-col bg-[#FAFAFA] w-[380px] rounded-xl overflow-hidden"
                  key={index}
                >
                  <Image className="w-[380px] h-[280px] object-cover bg-contain" src={'http://localhost:8000/foto_tipe_kamar/' + item.foto} width={380} height={280} alt="image" />
                  <div className="flex flex-col gap-y-2 px-4 py-6">
                    <p className="text-xs text-blue-700 font-normal">London NW8 7JT England</p>
                    <h1 className="font-semibold text-xl">{item?.nama_tipe_kamar}</h1>
                  </div>
                  <div className="flex gap-8 items-center px-4 pb-4">
                    <p className="text-[#222] font-normal">{formatIDR(item.harga)} Par Night</p>
                    <p className="w-[1px] h-4 bg-[#DDD]"></p>
                    <div className="flex gap-1">
                      <Image src={'/icons/star.svg'} width={16} height={16} alt="star" />
                      <Image src={'/icons/star.svg'} width={16} height={16} alt="star" />
                      <Image src={'/icons/star.svg'} width={16} height={16} alt="star" />
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;

export const SkeletonLoading = () => {
  return (
    <div className="flex flex-col bg-[#FAFAFA] w-[380px] rounded-xl overflow-hidden">
      <div className="w-[380px] h-[280px] bg-gray-300 animate-pulse"></div>
      <div className="flex flex-col gap-y-2 px-4 py-6">
        <p className="text-xs text-gray-300 animate-pulse">Loading...</p>
        <h1 className="font-semibold text-xl animate-pulse">Loading...</h1>
      </div>
      <div className="flex gap-8 items-center px-4 pb-4">
        <p className="text-[#222] font-normal animate-pulse">Loading...</p>
        <p className="w-[1px] h-4 bg-[#DDD]"></p>
        <div className="flex gap-1">
          <div className="w-16 h-16 bg-gray-300 animate-pulse"></div>
          <div className="w-16 h-16 bg-gray-300 animate-pulse"></div>
          <div className="w-16 h-16 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
