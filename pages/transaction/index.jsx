import { Navbar } from 'ahmad/components';
import React from 'react';

const Transaction = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-28 mx-44">
        <h1 className="text-lg font-bold">Daftar Transaksi</h1>
        <div className="flex gap-x-3 items-center mt-8">
          <h2 className="text-base font-bold">Status</h2>
          <div className="flex gap-3">
            <div className="py-1 px-3 text-sm text-blue-600 border border-blue-600 rounded-xl cursor-pointer">Semua</div>
            <div className="py-1 px-3 text-sm text-[#6D7588] border border-[#BFC9D9] rounded-xl cursor-pointer">Baru</div>
            <div className="py-1 px-3 text-sm text-[#6D7588] border border-[#BFC9D9] rounded-xl cursor-pointer">Check In</div>
            <div className="py-1 px-3 text-sm text-[#6D7588] border border-[#BFC9D9] rounded-xl cursor-pointer">Check Out</div>
          </div>
        </div>
        <div className='mt-18'></div>
      </div>
    </div>
  );
};

export default Transaction;
