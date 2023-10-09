import { Footer, Navbar } from 'ahmad/components';
import { LoginModal } from 'ahmad/components/Modal';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDateRange } from 'ahmad/context/datePicker';
import moment from 'moment';
import { HiOutlineArrowLeft } from 'react-icons/hi';

const Booking = () => {
  const { token } = parseCookies();
  const { startDate, setStartDate, endDate, setEndDate } = useDateRange();
  const [tipe, setTipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [numberMax, setNumberMax] = useState(null);
  const [showSelect, setShowSelect] = useState(false);
  const [code, setCode] = useState(false);
  const [selectedOption, setSelectedOption] = useState('1');
  const { email, nama } = parseCookies();
  const [showError, setShowError] = useState('');
  const containerRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    tipe_kamar: '',
    nama_user: nama,
    nama_pemesanan: '',
    email_pemesanan: email,
    tgl_pemesanan: moment().format('YYYY-MM-DD'),
    tgl_check_in: moment(startDate).format('YYYY-MM-DD'),
    tgl_check_out: moment(endDate).format('YYYY-MM-DD'),
    nama_tamu: nama,
    jumlah_kamar: selectedOption,
  });
  const { tgl_check_in, tgl_check_out } = router.query;

  useEffect(() => {
    setStartDate(tgl_check_in);
    setEndDate(tgl_check_out);
  }, [tgl_check_in, tgl_check_out]);

  const handleChangeEmail = (e) => {
    setFormData({ ...formData, email_pemesanan: e.target.value });
    setShowError('');
  };

  const handleChangeNamaTamu = (e) => {
    setFormData({ ...formData, nama_tamu: e.target.value });
    setShowError('');
  };

  const handleChangeNamaPesan = (e) => {
    setFormData({ ...formData, nama_pemesanan: e.target.value });
    setShowError('');
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      setNumberMax(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const saveTrans = async () => {
    if (formData.nama_pemesanan === '') {
      setShowError('Nama pemesanan tidak boleh kosong');
    } else if (formData.email_pemesanan === '') {
      setShowError('Email tidak boleh kosong');
    } else if (formData.nama_tamu === '') {
      setShowError('Nama tamu tidak boleh kosong');
    } else {
      const { token } = parseCookies();
      try {
        await axios.post('http://localhost:8000/pemesanan/', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        router.push('/transaction');
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (tipe) {
      setFormData({
        ...formData,
        tipe_kamar: tipe?.nama_tipe_kamar || '',
      });
    }
  }, [tipe]);

  useEffect(() => {
    if (selectedOption) {
      setFormData({
        ...formData,
        jumlah_kamar: selectedOption,
      });
    }
  }, [selectedOption]);

  useEffect(() => {
    getTipeKamar();
    getNomorKamar();
  }, [id]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSelect(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <div className="flex justify-between w-full">
          <div className="flex gap-x-12 w-3/5">
            <HiOutlineArrowLeft className="text-2xl mt-1 cursor-pointer" onClick={() => router.back()} />
            <div className="w-full">
              <h2 className="text-xl font-medium">Ringkasan Pemesanan</h2>
              <div className="border border-[#e8e8e8] p-4 mt-4 rounded-md">
                <div className=" flex justify-between items-center">
                  <p className="text-sm text-gray-600">saya memiliki sebuah kode promo</p>
                  <input type="checkbox" className="cursor-pointer" onClick={() => setCode(!code)} />
                </div>
                {code && (
                  <div className="mt-2 flex gap-x-4">
                    <input type="text" className="text-xs px-2 w-full bg-[#f5f5f5] rounded " placeholder="Enter Promo Code" />
                    <button className=" px-1 bg-green-500 text-white text-xs font-medium rounded">Gunakan Kode Promo</button>
                  </div>
                )}
              </div>
              <div className="border border-[#e8e8e8] p-4 mt-4 flex flex-col gap-3 rounded-md">
                <div className="flex flex-col gap-y-2">
                  <label className="text-xs text-[#909090]">Email</label>
                  <input
                    type="email"
                    value={formData.email_pemesanan}
                    onChange={handleChangeEmail}
                    className={`min-h-[44px] w-full px-4 rounded-md border ${showError === 'Email tidak boleh kosong' ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : ''} border-[#e8e8e8]`}
                    placeholder="Email"
                  />
                  {showError === 'Email tidak boleh kosong' && <p className="text-xs text-red-600 ">{showError}</p>}
                </div>
                <div className="flex flex-col gap-y-2">
                  <label className="text-xs text-[#909090]">Nama Tamu</label>
                  <input
                    type="text"
                    value={formData.nama_tamu}
                    onChange={handleChangeNamaTamu}
                    className={`min-h-[44px] w-full px-4 rounded-md border ${showError === 'Nama tamu tidak boleh kosong' ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : ''} border-[#e8e8e8]`}
                    placeholder="Nama Tamu"
                  />
                  {showError === 'Nama tamu tidak boleh kosong' && <p className="text-xs text-red-600 ">{showError}</p>}
                </div>
                <div className="flex flex-col gap-y-2">
                  <label className="text-xs text-[#909090]">Nama Pemesanan</label>
                  <input
                    type="text"
                    value={formData.nama_pemesanan}
                    onChange={handleChangeNamaPesan}
                    className={`min-h-[44px] w-full px-4 rounded-md border ${showError === 'Nama pemesanan tidak boleh kosong' ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : ''} border-[#e8e8e8]`}
                    placeholder="Nama Pemesanan"
                  />
                  {showError === 'Nama pemesanan tidak boleh kosong' && <p className="text-xs text-red-600 ">{showError}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 w-[300px] h-min shadow-2xl rounded-md">
            <div className="flex gap-x-4">
              <Image className="w-[88px] h-[88px]" src={`http://localhost:8000/foto_tipe_kamar/${tipe?.foto}`} width={100} height={100} alt="img" />
              <div className="">
                <h2 className="text-base">{tipe?.nama_tipe_kamar}</h2>
                <p className="text-xs ">{tipe?.deskripsi}</p>
              </div>
            </div>
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
                <div className="">
                  <p className="text-sm text-[#303030] font-semibold">Jumlah Kamar</p>
                  <p className="text-base cursor-pointer text-[#303030] font-normal" onClick={() => setShowSelect(!showSelect)}>
                    {selectedOption} Room
                  </p>
                </div>
              </div>
              {showSelect && (
                <div ref={containerRef} className="w-[100px] min-h-fit max-h-44 scrollbar scrollbar-thumb-blue-600 scrollbar-track-gray-100 scrollbar-medium overflow-y-scroll z-50 absolute bg-white shadow-[0_4px_10px_#0000004d] rounded-md ">
                  <h1 className="text-base font-medium p-1 text-center">Room</h1>
                  <hr className="mt-1 mb-2" />
                  <div className="p-2 min-w-fit flex flex-col gap-y-2">
                    {numberMax.map((item, index) => (
                      <p
                        className={`text-center cursor-pointer ${selectedOption === `${index + 1}` ? 'text-blue-600 bg-blue-200 rounded-full' : ''}`}
                        onClick={() => {
                          setSelectedOption(`${index + 1}`);
                          setShowSelect(false);
                        }}
                      >
                        {index + 1} Room
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="border border-[#ddd] mt-3 p-3 rounded-lg">
              <p className="text-sm text-[#303030] font-semibold">Tipe Kamar</p>
              <p className="text-base text-[#303030] font-normal">{tipe?.nama_tipe_kamar}</p>
            </div>
            <div className="border flex justify-between items-center border-[#ddd] mt-3 p-3 rounded-lg">
              <p className="text-sm text-[#303030] font-semibold">Harga Kamar : </p>
              <p className="text-sm text-[#303030] font-normal">{formatIDR(tipe?.harga)}</p>
            </div>
            <div className="flex justify-between my-3">
              <p className="text-sm text-[#303030] font-medium">Total harga</p>
              <p className="text-sm text-[#303030] font-medium">{formatIDR(tipe?.harga * selectedOption)}</p>
            </div>
            <button onClick={!token ? () => setShowModal(true) : () => saveTrans()} className="bg-blue-600 text-white py-3 w-full rounded-md">
              {!token && isClient ? 'Login' : 'Pesan Sekarang'}
            </button>
          </div>
        </div>
      </div>
      <LoginModal isVisible={showModal} close={() => setShowModal(false)} />
    </>
  );
};

export default Booking;
