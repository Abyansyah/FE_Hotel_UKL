import { Footer, Navbar } from 'ahmad/components';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { parseCookies } from 'nookies';
import { LoginModal } from 'ahmad/components/Modal';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDateRange } from 'ahmad/context/datePicker';
import moment from 'moment';

const ProductDeks = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useDateRange();
  const [tipe, setTipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [numberMax, setNumberMax] = useState(null);
  const router = useRouter();
  const { token } = parseCookies();
  const { id } = router.query;
  const { tgl_check_in, tgl_check_out } = router.query;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setStartDate(tgl_check_in);
    setEndDate(tgl_check_out);
  }, [tgl_check_in, tgl_check_out]);

  const getTipeKamar = async () => {
    const { token } = parseCookies();
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/tipe/${id}`, { headers: { Authorization: `Bearer ${token} ` } });
      const data = response.data;
      setTipe(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getNomorKamar = async () => {
    const { token } = parseCookies();
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/kamar/findByTipe/${id}?tgl_check_in=${tgl_check_in}&tgl_check_out=${tgl_check_out}`, { headers: { Authorization: `Bearer ${token} ` } });
      const data = response.data;
      console.log(data);
      setNumberMax(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTipeKamar();
    getNomorKamar();
  }, [id]);

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
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <button onClick={() => router.push('/')} className="text-xs text-blue-600">
              Home{' '}
            </button>
            <MdKeyboardArrowRight />
            <button onClick={() => router.back()} className="text-xs text-blue-600">
              Hotel{' '}
            </button>
            <MdKeyboardArrowRight />
            <p className="text-xs text-[#4c515a]">{tipe?.nama_tipe_kamar}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <Image className="rounded-l-lg w-[580px] object-cover h-[386px]" src={`http://localhost:8000/foto_tipe_kamar/${tipe?.foto}`} width={580} height={403} alt="Image" />
            <div className="flex flex-col gap-2">
              <Image className="w-[284px] h-[190px] object-cover" src={'https://source.unsplash.com/random/?hotel'} width={284} height={202} alt="Image" />
              <Image className="w-[284px] h-[190px] object-contain" src={'https://source.unsplash.com/random/?mattress'} width={284} height={202} alt="Image" />
            </div>
            <div className="flex flex-col gap-2">
              <Image className="  rounded-tr-lg" src={'/image/bg2.jpg'} width={284} height={202} alt="Image" />
              <Image className=" rounded-br-lg" src={'/image/bg2.jpg'} width={284} height={202} alt="Image" />
            </div>
          </div>
          <div className="flex pt-4 justify-between">
            <div className="w-7/12">
              <div className="flex flex-col gap-y-4">
                <h1 className="text-3xl font-semibold">{tipe?.nama_tipe_kamar}</h1>
                <p className="text-base text-gray-800">Jalan Poppies II, Jalan Poppies II, No.6, Kuta, Kecamatan Kuta, Kuta, Indonesia, 80361</p>
              </div>
              <div className="w-full bg-[#303030]"></div>
              <hr className="my-6" />
              <div className="flex flex-col gap-5">
                <h1 className="text-xl font-semibold text-gray-800 ">Fasilitas</h1>
                <div className="grid grid-rows-2 grid-flow-col gap-y-7">
                  <div className="flex items-center gap-x-6">
                    <Image src={'/icons/reception.png'} width={25} height={25} alt="icons" />
                    <p className="text-lg">Resepsionis</p>
                  </div>
                  <div className="flex items-center gap-x-6">
                    <Image src={'/icons/wifi1.png'} width={25} height={25} alt="icons" />
                    <p className="text-lg">Wifi gratis</p>
                  </div>
                  <div className="flex items-center gap-x-6">
                    <Image src={'/icons/mandi.png'} width={25} height={25} alt="icons" />
                    <p className="text-lg">Perlengkapan mandi</p>
                  </div>
                  <div className="flex items-center gap-x-6">
                    <Image src={'/icons/toilet.png'} width={25} height={25} alt="icons" />
                    <p className="text-lg">Toilet</p>
                  </div>
                  <div className="flex items-center gap-x-6">
                    <Image src={'/icons/tv.png'} width={25} height={25} alt="icons" />
                    <p className="text-lg">Televisi</p>
                  </div>
                  <div className="flex items-center gap-x-6">
                    <Image src={'/icons/parkir.png'} width={25} height={25} alt="icons" />
                    <p className="text-lg">Parkir mobil</p>
                  </div>
                </div>
              </div>
              <hr className="my-6" />
              <div className="flex flex-col gap-5">
                <h1 className="text-xl font-semibold text-gray-800 ">Lihat Peta</h1>
                <Image className="w-full h-44 object-cover rounded-lg" src={'/image/maps.png'} width={776} height={200} alt="maps" />
              </div>
              <hr className="my-6" />
              <div className="flex flex-col gap-5">
                <h1 className="text-xl font-semibold text-gray-800 ">Tentang Hotel</h1>
              </div>
              <div className="flex flex-col gap-6">
                <p className="mt-2">
                  Urbanview Hotel Anna Kuta Inn Bali terletak di Jalan Poppies II, No.6, Kuta, Kecamatan Kuta. Lokasi mudah diakses dan terletak di jalan utama. Ini merupakan properti bagus di area yang sangat strategis. Properti ini ideal
                  untuk perjalanan bisnis Anda, karena terletak sangat dekat dengan kawasan Central Business District.
                </p>
                <p>
                  Urbanview menghadirkan akomodasi yang memadukan antara kehidupan masyarakat urban dan alam. Dengan desain yang simple dan elemen alam di setiap sudutnya, Urbanview adalah akomodasi terbaik untuk mengembalikan energi dan
                  membuat Anda lebih rileks.
                </p>
                <p>
                  Urbanview Hotel Anna Kuta Inn Bali dilengkapi oleh beragam fasilitas penunjang kenyamanan, seperti; kamar non-smoking, WiFi, LED-TV, akses kunci kartu, resepsionis 24 jam, linen bersih, air mineral kemasan, sabun mandi,
                  handuk, dan kolam renang. Jangan khawatir tentang kendaraan Anda, Urbanview Hotel Anna Kuta Inn Bali menyediakan parkir yang layak dan aman.
                </p>
                <p>
                  Lokasi hotel juga dikelilingi oleh beragam pusat wisata, perbelanjaan dan hiburan utama, seperti; Made’s Warung (1 km), Bali Bomb Memorial (1,5 km), Pantai Kuta (1,6 km), Hard Rock Cafe Bali (1,6 km), Beachwalk Shopping
                  Center (2,1 km), Waterbom Bali (2,7 km), dan Discovery Mall Bali (2,9 km).
                </p>
              </div>
            </div>
            <div className="p-5 w-[300px] h-min shadow-2xl rounded-md">
              <h1 className="text-2xl text-[#303030] font-semibold">{formatIDR(tipe?.harga)}</h1>
              <div className="border border-[#ddd] mt-5  rounded-lg">
                <div className="flex p-4 justify-between items-center">
                  <div>
                    <p className="text-sm text-[#303030] font-semibold">Check In </p>
                    <p className="text-base text-[#303030] font-normal">{moment(startDate).format('ddd, DD MMM')}</p>
                  </div>
                  <div className="w-[1px] h-[34px] bg-[#ddd]"></div>
                  <div>
                    <p className="text-sm text-[#303030] font-semibold">Check In </p>
                    <p className="text-base text-[#303030] font-normal">{moment(endDate).format('ddd, DD MMM')}</p>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-[#ddd]"></div>
                <div className="flex p-4">
                  <div>
                    <p className="text-sm text-[#303030] font-semibold">Jumlah Kamar</p>
                    <p className="text-base text-[#303030] font-normal">1</p>
                  </div>
                </div>
              </div>
              <div className="border border-[#ddd] mt-3 p-3 rounded-lg">
                <p className="text-sm text-[#303030] font-semibold">Tipe Kamar</p>
                <p className="text-base text-[#303030] font-normal">{tipe?.nama_tipe_kamar}</p>
              </div>
              <div className="flex justify-between my-3">
                <p className="text-sm text-[#303030] font-medium">Total harga</p>
                <p className="text-sm text-[#303030] font-medium">{formatIDR(tipe?.harga)}</p>
              </div>
              <button disabled={numberMax === null ? true : false} onClick={() => router.push(`/booking/${tipe?.id}?tgl_check_in=${tgl_check_in}&tgl_check_out=${tgl_check_out}`)} className="bg-blue-600 text-white py-3 w-full rounded-md">
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <LoginModal isVisible={showModal} close={() => setShowModal(false)} />
    </>
  );
};

export default ProductDeks;
