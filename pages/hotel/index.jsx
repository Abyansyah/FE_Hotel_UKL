import { Navbar } from 'ahmad/components';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

const Produk = () => {
  const [tipe, setTipe] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { tgl_check_in, tgl_check_out } = router.query;

  const getByDate = async () => {
    const { token } = parseCookies();
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/tipe/tgl/?tgl_check_in=${tgl_check_in}&tgl_check_out=${tgl_check_out}`, { headers: { Authorization: `Bearer ${token} ` } });
      const data = response.data;
      setTipe(data.data);
      setIsLoading(false);
    } catch (error) {
      setTipe([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getByDate();
  }, [tgl_check_in, tgl_check_out]);

  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  return (
    <>
      <Navbar />
      <div className="pt-28 mx-44">
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Filter</h1>
            <h2 className="text-base font-semibold"> {tipe.length === 0 ? 'Tidak tersedia di tanggal tersebut' : `${tipe.length} Tipe kamar tersedia`} </h2>
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
                {isLoading ? (
                  <SkeletonLoading />
                ) : (
                  <>
                    {tipe?.map((item, index) => (
                      <Link href={`/hotel/${item.id}?tgl_check_in=${tgl_check_in}&tgl_check_out=${tgl_check_out}`} className="flex gap-5 cursor-pointer" key={index}>
                        <Image className="rounded-lg w-[338px] h-[225px]" src={`http://localhost:8000/foto_tipe_kamar/${item.foto}`} width={338} height={225} />
                        <div>
                          <h1 className="text-2xl font-semibold mb-2">{item.nama_tipe_kamar}</h1>
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
                          <h1 className="text-xl font-semibold mt-12">{formatIDR(item.harga)}</h1>
                        </div>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const SkeletonLoading = () => {
  return (
    <div className="flex gap-5">
      {/* Image Placeholder */}
      <div className="w-36 h-24 bg-gray-300 rounded-lg animate-pulse"></div>
      <div>
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-300 rounded-full w-3/4 mb-2 animate-pulse"></div>
        {/* Location Placeholder */}
        <div className="h-4 bg-gray-300 rounded-full w-1/2 mb-2 animate-pulse"></div>
        {/* Rating Placeholder */}
        <div className="flex gap-2 items-center mb-2">
          <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-full w-12 animate-pulse"></div>
        </div>
        {/* Icons Placeholder */}
        <div className="flex gap-4">
          <div className="flex items-center gap-x-2">
            <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded-full w-16 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded-full w-16 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded-full w-16 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded-full w-16 animate-pulse"></div>
          </div>
        </div>
        {/* Price Placeholder */}
        <div className="h-6 bg-gray-300 rounded-full w-1/2 mt-4 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Produk;
