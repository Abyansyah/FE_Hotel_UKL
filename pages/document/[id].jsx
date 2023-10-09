import Image from 'next/image';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from 'moment';
import { HiOutlineArrowLeft } from 'react-icons/hi';

const Document = () => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const checkIn = moment(data?.tgl_check_in);
  const checkOut = moment(data?.tgl_check_out);
  const totalDays = checkOut.diff(checkIn, 'days');

  const getDetailTransaksi = async () => {
    try {
      const { token } = parseCookies();
      const response = await axios.get(`http://localhost:8000/pemesanan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const detailData = response.data;
      setData(detailData.data);
    } catch (error) {}
  };

  useEffect(() => {
    getDetailTransaksi();
  }, [id]);

  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  console.log(data?.detail_pemesanan?.length);

  const downloadAsPdf = () => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById('note_container');
      const opt = {
        margin: 0,
        filename: `${data?.nomor_pemesanan}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      import('html2pdf.js').then((module) => {
        module.default().set(opt).from(element).save();
      });
    }
  };

  console.log(data);

  return (
    <div className="bg-gray-50 h-screen">
      <div className="bg-gray-50 h-screen pt-10">
        <div className=" flex justify-between mx-52 gap-x-3">
          <HiOutlineArrowLeft className="text-2xl mt-1 cursor-pointer" onClick={() => router.back()} />
          <button
            className="inline-flex justify-center items-center gap-x-3 text-sm text-center border hover:border-gray-300 shadow-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4  "
            href="#"
            onClick={downloadAsPdf}
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
            </svg>
            Print
          </button>
        </div>

        <div className="h-screen px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
          <div className="sm:w-11/12 lg:w-3/4 mx-auto">
            <div id="note_container" className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl ">
              <div className="flex justify-between">
                <div>
                  <Image src={'/logo/king.svg'} width={300} height={40} alt="logo" />
                </div>

                <div className="text-right">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 ">Invoice #</h2>
                  <span className="mt-1 block text-gray-500">{data?.nomor_pemesanan}</span>

                  <div className="mt-4 not-italic text-gray-800 ">
                    45 Roker Terrace
                    <br />
                    Latheronwheel
                    <br />
                    KW5 8NW, London
                    <br />
                    United Kingdom
                    <br />
                  </div>
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 ">Bill to:</h3>
                  <h3 className="text-lg font-semibold text-gray-800 ">{data?.user?.nama_user}</h3>
                  <div className="mt-2 not-italic text-gray-500">
                    280 Suzanne Throughway,
                    <br />
                    Breannabury, OR 45801,
                    <br />
                    United States
                    <br />
                  </div>
                </div>

                <div className="sm:text-right space-y-2">
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 ">Invoice date:</dt>
                      <dd className="col-span-2 text-gray-500">{moment(data?.tgl_pemesanan).format('MM/DD/YYYY')}</dd>
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 ">Due date:</dt>
                      <dd className="col-span-2 text-gray-500">{moment(data?.tgl_check_out).format('MM/DD/YYYY')}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="border border-gray-200 p-4 rounded-lg space-y-4 ">
                  <div className="hidden sm:grid sm:grid-cols-5">
                    <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Item</div>
                    <div className="text-left text-xs font-medium text-gray-500 uppercase">Qty</div>
                    <div className="text-right text-xs font-medium text-gray-500 uppercase">Amount</div>
                  </div>

                  <div className="hidden sm:block border-b border-gray-200 "></div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div className="col-span-full sm:col-span-2">
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                      <p className="font-medium text-gray-800 ">{data?.tipe_kamar?.nama_tipe_kamar}</p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                      <p className="text-gray-800 ">{data?.detail_pemesanan_count}</p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                      <p className="sm:text-right text-gray-800 ">{formatIDR(data?.tipe_kamar?.harga)}</p>
                    </div>
                  </div>

                  <div className="sm:hidden border-b border-gray-200 "></div>

                  <div className="sm:hidden border-b border-gray-200 "></div>
                </div>
              </div>

              <div className="mt-8 flex sm:justify-end">
                <div className="w-full max-w-2xl sm:text-right space-y-2">
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 ">Subtotal:</dt>
                      <dd className="col-span-2 text-gray-500">{formatIDR(data?.tipe_kamar?.harga)}</dd>
                    </dl>

                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 ">Total:</dt>
                      <dd className="col-span-2 text-gray-500">{formatIDR(data?.tipe_kamar?.harga * data?.detail_pemesanan?.length * totalDays)}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-12">
                <h4 className="text-lg font-semibold text-gray-800 ">Thank you!</h4>
                <p className="text-gray-500">If you have any questions concerning this invoice, use the following contact information:</p>
                <div className="mt-2">
                  <p className="block text-sm font-medium text-gray-800 ">example@site.com</p>
                  <p className="block text-sm font-medium text-gray-800 ">+1 (062) 109-9222</p>
                </div>
              </div>

              <p className="mt-5 text-sm text-gray-500">© 2022 Preline.</p>
            </div>
          </div>
        </div>

        {/* // content pdf */}
      </div>
    </div>
  );
};

export default Document;

export async function getServerSideProps(context) {
  const { token } = parseCookies(context);
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
