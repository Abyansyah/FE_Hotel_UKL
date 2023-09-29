import { Navbar } from 'ahmad/components';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CiLocationOn } from 'react-icons/ci';

const Produk = () => {
  return (
    <>
      <Navbar />
      <div className="pt-28 mx-44">
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Filter</h1>
            <h2 className="text-base font-semibold">20 Hotel tersedia</h2>
            <Link className="flex items-center text-sm border rounded-full py-1 px-1 gap-x-1" href={'https://www.google.com/maps'} target="_blank">
              <CiLocationOn /> Tampilan Peta
            </Link>
          </div>
          <div className="flex">
            <div className="w-1/4">
              <div className="flex flex-col gap-4">
                <h1 className="text-base font-semibold">Rekomendasi Hotel</h1>
                <div className="flex items-center gap-x-3">
                  <input className="" type="checkbox" />
                  <p>Top Properti</p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <hr />
              <div className="mt-8 flex flex-col gap-y-10">
                <div className="flex gap-5">
                  <Image className="rounded-lg" src={'/image/bg2.jpg'} width={338} height={225} />
                  <div>
                    <h1 className="text-2xl font-semibold mb-2">King Hotel Eksekutif</h1>
                    <p className="text-sm text-[#4C515A]">Ngasem, Kab. Kediri</p>
                    <div className="my-[14px] flex gap-2 items-center">
                      <Image src={'/icons/star.svg'} width={20} height={20} />
                      <p className="font-semibold">4.7</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-x-2">
                        <Image src={'/icons/reception.png'} width={16} height={16} alt="icons" />
                        <p className="text-sm">Resepsionis</p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <Image src={'/icons/wifi1.png'} width={16} height={16} alt="icons" />
                        <p className="text-sm">Wifi gratis</p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <Image src={'/icons/mandi.png'} width={16} height={16} alt="icons" />
                        <p className="text-sm">Perlengkapan mandi</p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <Image src={'/icons/toilet.png'} width={16} height={16} alt="icons" />
                        <p className="text-sm">Toilet</p>
                      </div>
                    </div>
                    <h1 className="text-xl font-semibold mt-12">Rp 120.000</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Produk;
