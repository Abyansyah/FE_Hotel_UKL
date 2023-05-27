import { Detail, Sidebar, Modal } from 'ahmad/components';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import moment from 'moment';

const Transaksi = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDdetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [hasil, setHasil] = useState(data);
  const [detail, setDetail] = useState('');
  const [idStatus, setIdStatus] = useState(null);
  const [tipeKamarOptions, setTipeKamarOptions] = useState([]);
  const [user, setUser] = useState('');
  const [status, setStatus] = useState('');
  const { email, nama } = parseCookies();
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    tipe_kamar: '',
    nama_user: nama,
    nama_pemesanan: '',
    email_pemesanan: email,
    tgl_pemesanan: moment().format('YYYY-MM-DD'),
    tgl_check_in: '',
    tgl_check_out: '',
    nama_tamu: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(idStatus);

  const formattedDatetime = (datetimeString) => new Date(datetimeString).toLocaleString();

  const handleAdd = () => {
    setShowModal(true);
  };

  const getTipeKamar = async () => {
    const { token } = parseCookies();
    try {
      const response = await axios.get('http://localhost:8000/tipe', { headers: { Authorization: `Bearer ${token} ` } });
      const data = response.data;
      setTipeKamarOptions(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTipeKamar();
  }, []);

  const saveTrans = async (e) => {
    e.preventDefault();
    const { token } = parseCookies();

    try {
      await axios.post('http://localhost:8000/pemesanan/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowModal(false);
      const response = await axios.get('http://localhost:8000/pemesanan/', { headers: { Authorization: `Bearer ${token}` } });
      setHasil(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    setShowEdit(true);
    setIdStatus(id);
    try {
      const { token } = parseCookies();
      const response = await axios.get(`http://localhost:8000/pemesanan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.data;
      setStatus(userData.status_pemesanan);
    } catch (error) {
      console.log(error);
    }
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    const { token } = parseCookies();
    const data = {
      status_pemesanan: status,
    };
    try {
      await axios.put(`http://localhost:8000/pemesanan/status/${idStatus}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowEdit(false);
      const response = await axios.get('http://localhost:8000/pemesanan/', { headers: { Authorization: `Bearer ${token}` } });
      setHasil(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetail = async (id) => {
    setShowDetail(true);
    try {
      const { token } = parseCookies();
      const response = await axios.get(`http://localhost:8000/pemesanan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.data;
      setDetail(userData);
      setUser(userData.user.nama_user);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'baru') {
      return 'bg-orange-400';
    } else if (status === 'check_in') {
      return 'bg-green-400';
    } else {
      return 'bg-red-400';
    }
  };

  const handleSearch = () => {
    const filteredUsers = data.filter((tran) => {
      return tran.tipe_kamar.nama_tipe_kamar.toLowerCase().includes(searchQuery.toLowerCase()) || tran.nama_tamu.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setHasil(filteredUsers);
  };

  return (
    <>
      <Sidebar>
        <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
          <div class="w-full mb-1">
            <div class="mb-4">
              <nav class="flex mb-5" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                  <li class="inline-flex items-center">
                    <a href="#" class="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                      <svg class="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                      </svg>
                      Home
                    </a>
                  </li>
                  <li>
                    <div class="flex items-center">
                      <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                      </svg>
                      <a href="#" class="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">
                        Transaksi
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All Transaksi</h1>
            </div>
            <div class="sm:flex">
              <div class="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                <form class="lg:pr-3" action="#" method="GET">
                  <label for="users-search" class="sr-only">
                    Search
                  </label>
                  <div class="relative mt-1 lg:w-64 xl:w-96">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyUp={handleSearch}
                      id="users-search"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search for users"
                    />
                  </div>
                </form>
              </div>
              <div class="flex items-center ml-auto space-x-2 sm:space-x-3">
                <button
                  type="button"
                  onClick={() => handleAdd()}
                  class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                  </svg>
                  Add Transaksi
                </button>
                <a
                  href="#"
                  class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Export
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* table */}
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden shadow">
                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                  <thead class="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="col" class="p-4">
                        <div class="flex items-center text-gray-500  text-xs font-medium text-left uppercase dark:text-gray-400">No</div>
                      </th>
                      <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Nama Pemesanan
                      </th>
                      <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Email
                      </th>
                      <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Tipe Kamar
                      </th>
                      <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Status
                      </th>
                      <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {hasil.length === 0 ? (
                      <tr>
                        <td colSpan="5" class="p-4 text-center font-normal text-gray-900 whitespace-nowrap dark:text-white">
                          Kamar not found
                        </td>
                      </tr>
                    ) : (
                      <>
                        {hasil.map((item, index) => (
                          <tr class="hover:bg-gray-100 dark:hover:bg-gray-700 " key={index}>
                            <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                            <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">{item.nama_pemesanan}</td>
                            <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">{item.email_pemesanan}</td>
                            <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">{item.tipe_kamar.nama_tipe_kamar}</td>
                            <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                              {' '}
                              <div class="flex items-center">
                                <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(item.status_pemesanan)} mr-2`}></div>
                                {item.status_pemesanan}
                              </div>
                            </td>
                            <td class="p-4 space-x-2 whitespace-nowrap">
                              <button
                                type="button"
                                data-modal-toggle="edit-user-modal"
                                onClick={() => handleEdit(item.id)}
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                              >
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                  <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
                                </svg>
                                Edit Transaksi
                              </button>
                              <button
                                type="button"
                                data-modal-toggle="delete-user-modal"
                                onClick={() => handleDetail(item.id)}
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
                              >
                                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                                </svg>
                                Detail
                              </button>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>

      {/* Add Modal */}
      <Modal isVisible={showModal} close={() => setShowModal(false)} judul={'add Tipe'}>
        <form onSubmit={saveTrans}>
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nama Pemesanan
                </label>
                <input
                  type="text"
                  name="nama_pemesanan"
                  value={formData.nama_pemesanan}
                  onChange={handleChange}
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Bonnie"
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tipe Kamar
                </label>
                <select
                  id="countries"
                  name="tipe_kamar"
                  value={formData.tipe_kamar}
                  onChange={handleChange}
                  className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select a Tipe Kamar</option>
                  {tipeKamarOptions.map((option) => (
                    <option key={option.id} value={option.nama_tipe_kamar}>
                      {option.nama_tipe_kamar}
                    </option>
                  ))}
                </select>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tanggal Check In
                </label>
                <input
                  type="date"
                  name="tgl_check_in"
                  value={formData.tgl_check_in}
                  onChange={handleChange}
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Bonnie"
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tanggal Check Out
                </label>
                <input
                  type="date"
                  name="tgl_check_out"
                  value={formData.tgl_check_out}
                  onChange={handleChange}
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Bonnie"
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nama Tamu
                </label>
                <input
                  type="text"
                  name="nama_tamu"
                  value={formData.nama_tamu}
                  onChange={handleChange}
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          <div class="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="submit"
            >
              Add Kamar
            </button>
          </div>
        </form>
      </Modal>

      {/* Detail Modal */}
      <Detail isVisible={showDdetail} close={() => setShowDetail(false)}>
        <div class="relative overflow-x-auto">
          <table class="flex gap-x-24 items-center w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="flex flex-col text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="flex flex-col gap-y-6">
                <th scope="col">Tanggal Pesan : </th>
                <th scope="col">Tanggal Check in : </th>
                <th scope="col">Tanggal Check out :</th>
                <th scope="col">Nama Tamu :</th>
                <th scope="col">Nama User :</th>
                <th scope="col">jumlah Kamar :</th>
              </tr>
            </thead>
            <tbody>
              <tr class="flex flex-col gap-y-5 bg-white dark:bg-gray-700">
                <td>{formattedDatetime(detail.tgl_pemesanan)}</td>
                <td>{formattedDatetime(detail.tgl_check_in)}</td>
                <td>{formattedDatetime(detail.tgl_check_out)}</td>
                <td>{detail.nama_tamu}</td>
                <td>{user}</td>
                <td>{detail.jumlah_kamar}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Detail>

      {/* Edit Modal */}
      <Modal isVisible={showEdit} close={() => setShowEdit(false)} judul={'Edit Tipe'}>
        <form onSubmit={saveEdit}>
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Status
                </label>
                <select
                  id="countries"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  class="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Status</option>
                  <option value="check_in">Check in</option>
                  <option value="check_out">check out</option>
                </select>
              </div>
            </div>
          </div>

          <div class="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="submit"
            >
              Update Status
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Transaksi;

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
  try {
    const response = await axios.get('http://localhost:8000/pemesanan', { headers: { Authorization: `Bearer ${token} ` } });
    return { props: { data: response.data.data, token: token } };
  } catch (error) {
    console.error(error);
    return { props: { data: [] } };
  }
}
