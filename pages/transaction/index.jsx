import { Navbar } from 'ahmad/components';
import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useDateRange } from 'ahmad/context/datePicker';

const Transaction = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useDateRange();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = parseCookies();
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState('Semua');

  const checkIn = moment(data?.tgl_check_in);
  const checkOut = moment(data?.tgl_check_out);
  const totalDays = checkOut.diff(checkIn, 'days');

  const getDetailPemesanan = async () => {
    try {
      setIsLoading(true);
      const { token } = parseCookies();
      const response = await axios.get(`http://localhost:8000/pemesanan/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const detailData = response.data;
      setIsLoading(false);
      setData(detailData.data);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetailPemesanan();
  }, [id]);

  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  useEffect(() => {
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setEndDate(nextDay);
  }, []);

  const filteredData = data?.filter((item) => selectedStatus === 'Semua' || item.status_pemesanan === selectedStatus);

  return (
    <div>
      <Navbar />
      <div className="mt-28 mx-44">
        <h1 className="text-lg font-bold">Daftar Transaksi</h1>
        <div className="flex gap-x-3 items-center mt-8">
          <h2 className="text-base font-bold">Status</h2>
          <div className="flex gap-3">
            <div onClick={() => setSelectedStatus('Semua')} className={`py-1 px-3 text-sm border rounded-xl cursor-pointer ${selectedStatus === 'Semua' ? 'text-blue-600 border-blue-600' : 'text-[#6D7588] border-[#BFC9D9]'}`}>
              Semua
            </div>
            <div onClick={() => setSelectedStatus('baru')} className={`py-1 px-3 text-sm border rounded-xl cursor-pointer ${selectedStatus === 'baru' ? 'text-blue-600 border-blue-600' : 'text-[#6D7588] border-[#BFC9D9]'}`}>
              Baru
            </div>
            <div onClick={() => setSelectedStatus('check_in')} className={`py-1 px-3 text-sm border rounded-xl cursor-pointer ${selectedStatus === 'check_in' ? 'text-blue-600 border-blue-600' : 'text-[#6D7588] border-[#BFC9D9]'}`}>
              Check In
            </div>
            <div onClick={() => setSelectedStatus('check_out')} className={`py-1 px-3 text-sm border rounded-xl cursor-pointer ${selectedStatus === 'check_out' ? 'text-blue-600 border-blue-600' : 'text-[#6D7588] border-[#BFC9D9]'}`}>
              Check Out
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-y-10">
          {isLoading ? (
            <SkeletonLoading />
          ) : filteredData?.length === 0 ? (
            <p>No transactions with the selected status.</p>
          ) : (
            filteredData?.map((item, index) => (
              <div className="border border-[#e5e7eb] rounded-lg w-[890px] " key={index}>
                <div className="flex justify-between p-6">
                  <div className="flex gap-x-10">
                    <div>
                      <h1 className="text-[#111827] font-medium text-sm">Order number</h1>
                      <p className="text-[#6B7280]">{item?.nomor_pemesanan}</p>
                    </div>
                    <div>
                      <h1 className="text-[#111827] font-medium text-sm">Date placed</h1>
                      <p className="text-[#6B7280]">{moment(item?.tgl_pemesanan).format('MMM DD, YYYY')}</p>
                    </div>
                    <div>
                      <h1 className="text-[#111827] font-medium text-sm">Amount</h1>
                      <p className="text-[#6B7280]">{formatIDR(item?.tipe_kamar?.harga)}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <button onClick={() => router.push(`/document/${item?.id}`)} className="border border-[#D1D5DB] rounded-lg px-3 font-normal">
                      View Invoice
                    </button>
                  </div>
                </div>
                <hr />
                <div className="p-6">
                  <div className="flex gap-x-6">
                    <Image src={`http://localhost:8000/foto_tipe_kamar/${item?.tipe_kamar?.foto}`} width={160} height={160} />
                    <div className="">
                      <div className="flex justify-between">
                        <h1 className="font-medium text-sm text-[#111827]">{item?.tipe_kamar?.nama_tipe_kamar}</h1>
                        <p className="font-medium text-sm text-[#111827]">{formatIDR(item?.total_harga)}</p>
                      </div>
                      <p className="text-[#6B7280] text-sm mt-2">{item?.tipe_kamar?.deskripsi}</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-7">
                    <div className="flex gap-x-2 items-center">
                      <BsCheckCircleFill color="#22C55E" />
                      <p className="text-[#6B7280] text-sm font-medium">
                        {item?.status_pemesanan} on {moment(item?.updatedAt).format('MMMM D, YYYY')}
                      </p>
                    </div>
                    <div
                      onClick={() => router.push(`/hotel/${item?.tipe_kamar?.id}?tgl_check_in=${moment(startDate).format('YYYY-MM-DD')}&tgl_check_out=${moment(endDate).format('YYYY-MM-DD')}`)}
                      className="text-blue-600 font-medium cursor-pointer"
                    >
                      View product
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;

export const SkeletonLoading = () => {
  return (
    <div className="border border-[#e5e7eb] rounded-lg w-[890px] p-6 animate-pulse">
      <div className="flex justify-between">
        <div className="flex gap-x-10">
          <div className="w-1/4 flex gap-x-6">
            <h1 className="text-[#111827] font-medium text-sm">Order number</h1>
            <div className="bg-gray-300 h-4 w-32 rounded-lg mb-2"></div>
            <h1 className="text-[#111827] font-medium text-sm">Date placed</h1>
            <div className="bg-gray-300 h-4 w-32 rounded-lg mb-2"></div>
            <h1 className="text-[#111827] font-medium text-sm">Total amount</h1>
            <div className="bg-gray-300 h-4 w-32 rounded-lg mb-2"></div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-300 h-8 w-32 rounded-lg"></div>
        </div>
      </div>
      <hr className="my-6" />
      <div className="flex gap-x-6">
        <div className="w-32 h-32 bg-gray-300 rounded-lg"></div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <h1 className="font-medium text-sm text-[#111827]">Double Stack Clothing Bag</h1>
            <div className="bg-gray-300 h-4 w-20 rounded-lg"></div>
          </div>
          <div className="bg-gray-300 h-20 w-full rounded-lg my-2"></div>
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2 items-center">
              <svg className="w-5 h-5 text-[#22C55E] bg-gray-300 rounded-full p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path>
              </svg>
              <p className="text-[#6B7280] text-sm font-medium">Delivered on January 5, 2021</p>
            </div>
            <a href="#" className="text-blue-600 font-medium">
              View product
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { token, role } = parseCookies(context);
  if (!token && role !== 'tamu') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {},
    };
  }
  return {
    props: {},
  };
}
