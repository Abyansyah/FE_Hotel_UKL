import { Sidebar } from 'ahmad/components';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { Modal, Delete } from 'ahmad/components';

const Kamar = ({ data }) => {
  const [hasil, setHasil] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [nomor, setNomor] = useState(0);
  const [tipeKamar, setTipeKamar] = useState('');
  const [kamarId, setKamarId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tipeKamarOptions, setTipeKamarOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { role } = parseCookies();
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [nomorError, setNomorError] = useState('');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const dataSlice = hasil.slice(startIndex, endIndex);
    setPaginatedData(dataSlice);

    const totalPagesCount = Math.ceil(hasil.length / rowsPerPage);
    setTotalPages(totalPagesCount);
  }, [hasil, currentPage, rowsPerPage]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAdd = () => {
    setShowModal(true);
    setNomor('');
    setTipeKamar('');
  };

  const getTipeKamar = async () => {
    const { token } = parseCookies();
    try {
      const response = await axios.get('http://localhost:8000/tipe', { headers: { Authorization: `Bearer ${token} ` } });
      const data = response.data;
      setTipeKamarOptions(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTipeKamar();
  }, []);

  const saveTipe = async (e) => {
    e.preventDefault();
    const { token } = parseCookies();
    const data = {
      jumlah_kamar: nomor,
      nama_tipe_kamar: tipeKamar,
    };
    try {
      await axios.post('http://localhost:8000/kamar/', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowModal(false);
      const response = await axios.get('http://localhost:8000/kamar/', { headers: { Authorization: `Bearer ${token}` } });
      setHasil(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (userId) => {
    setKamarId(userId);
    setShowEdit(true);
    try {
      const { token } = parseCookies();
      const response = await axios.get(`http://localhost:8000/kamar/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.data;
      console.log(userData);
      setNomor(userData.nomor_kamar);
      setTipeKamar(userData.tipe_kamar.nama_tipe_kamar);
    } catch (error) {
      console.log(error);
    }
  };

  const editTipe = async (e) => {
    e.preventDefault();
    const { token } = parseCookies();
    const data = {
      nomor_kamar: nomor,
      nama_tipe_kamar: tipeKamar,
    };
    try {
      await axios.put(`http://localhost:8000/kamar/${kamarId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowEdit(false);
      const response = await axios.get('http://localhost:8000/kamar/', { headers: { Authorization: `Bearer ${token}` } });
      setHasil(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    setDelete(true);
    setKamarId(id);
  };

  const deleteUser = async (id) => {
    const { token } = parseCookies();
    try {
      await axios.delete(`http://localhost:8000/kamar/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setDelete(false);
      const response = await axios.get('http://localhost:8000/kamar', { headers: { Authorization: `Bearer ${token}` } });
      setHasil(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = () => {
    const filteredUsers = data.filter((user) => {
      const nomorKamar = user.nomor_kamar.toString();

      return user.tipe_kamar.nama_tipe_kamar.toLowerCase().includes(searchQuery.toLowerCase()) || nomorKamar.toLowerCase().includes(searchQuery.toLowerCase());
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
                        Kamar
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All Kamar</h1>
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
                {role === 'admin' && isClient ? (
                  <button
                    type="button"
                    onClick={() => handleAdd()}
                    class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                    Add Kamar
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {/* table */}
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden shadow">
                <table class="min-w-full divide-y overflow-y-hidden divide-gray-200 table-fixed dark:divide-gray-600">
                  <thead class="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="col" class="p-4">
                        <div class="flex items-center text-gray-500  text-xs font-medium text-left uppercase dark:text-gray-400">No</div>
                      </th>
                      <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Nomor Kamar
                      </th>
                      <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Tipe Kamar
                      </th>
                      {role === 'admin' && isClient ? (
                        <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                          Actions
                        </th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {isLoading && isClient ? (
                      <tr>
                        <td colSpan="5" class="p-4 text-center font-normal text-gray-900 whitespace-nowrap dark:text-white">
                          <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
                        </td>
                      </tr>
                    ) : paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan="5" class="p-4 text-center font-normal text-gray-900 whitespace-nowrap dark:text-white">
                          Kamar not found
                        </td>
                      </tr>
                    ) : (
                      <>
                        {paginatedData.map((tipe, index) => (
                          <tr class="hover:bg-gray-100 dark:hover:bg-gray-700 " key={index}>
                            <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                            <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">Nomor - {tipe.nomor_kamar}</td>
                            <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">{tipe.tipe_kamar.nama_tipe_kamar}</td>
                            {role === 'admin' && isClient ? (
                              <td class="p-4 space-x-2 whitespace-nowrap">
                                <button
                                  type="button"
                                  data-modal-toggle="edit-user-modal"
                                  onClick={() => handleEdit(tipe.id)}
                                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                    <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
                                  </svg>
                                  Edit Kamar
                                </button>
                                <button
                                  type="button"
                                  data-modal-toggle="delete-user-modal"
                                  onClick={() => handleDelete(tipe.id)}
                                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                                >
                                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      fill-rule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                  Delete Kamar
                                </button>
                              </td>
                            ) : null}
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                  <div className="py-3 flex justify-end border-t border-gray-200">
                    <div className="hidden justify-end sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <nav className="relative z-0 inline-flex items-center gap-4 rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${currentPage === 1 ? 'border-gray-300 text-gray-400' : 'border-gray-300 hover:border-gray-400'} bg-white text-sm font-medium ${
                              currentPage === 1 ? 'text-gray-400' : 'text-gray-500 hover:bg-gray-50'
                            }`}
                            disabled={currentPage === 1}
                          >
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10.707 5.293a1 1 0 010 1.414L8.414 9H14a1 1 0 110 2H8.414l2.293 2.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <div>
                            <p className="text-sm text-gray-400">
                              Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                            </p>
                          </div>
                          <button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M9.293 14.293a1 1 0 010-1.414L11.586 11H6a1 1 0 010-2h5.586l-2.293-2.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>

      {/* Add Modal */}
      <Modal isVisible={showModal} close={() => setShowModal(false)} judul={'add Tipe'}>
        <form onSubmit={saveTipe}>
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Jumlah Nomor Kamar
                </label>
                <input
                  type="number"
                  name="first-name"
                  id="first-name"
                  value={nomor}
                  onChange={(e) => setNomor(e.target.value)}
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="1"
                  min="1" // Set the minimum value to 1
                  max="10"
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Tipe Kamar
                </label>
                <select
                  id="countries"
                  value={tipeKamar}
                  onChange={(e) => setTipeKamar(e.target.value)}
                  class="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value=""></option>
                  {tipeKamarOptions.map((option) => (
                    <option key={option.id} value={option.nama_tipe_kamar}>
                      {option.nama_tipe_kamar}
                    </option>
                  ))}
                </select>
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

      {/* Edit Modal */}
      <Modal isVisible={showEdit} close={() => setShowEdit(false)} judul={'Edit Tipe'}>
        <form onSubmit={editTipe}>
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nomor
                </label>
                <input
                  type="number"
                  name="first-name"
                  id="first-name"
                  value={nomor}
                  onChange={(e) => setNomor(e.target.value)}
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
                  value={tipeKamar}
                  onChange={(e) => setTipeKamar(e.target.value)}
                  class="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">{tipeKamar}</option>
                  {tipeKamarOptions.map((option) => (
                    <>
                      <option key={option.id} value={option.nama_tipe_kamar}>
                        {option.nama_tipe_kamar}
                      </option>
                    </>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div class="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="submit"
            >
              Update Kamar
            </button>
          </div>
        </form>
      </Modal>

      <Delete isVisible={showDelete} close={() => setDelete(false)}>
        <a
          href="#"
          onClick={() => deleteUser(kamarId)}
          class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800"
        >
          Yes, I'm sure
        </a>
        <a
          href="#"
          onClick={() => setDelete(false)}
          class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          data-modal-toggle="delete-user-modal"
        >
          No, cancel
        </a>
      </Delete>
    </>
  );
};

export default Kamar;

export async function getServerSideProps(context) {
  const { token, role } = parseCookies(context);
  if (!token && role === 'tamu') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  try {
    const response = await axios.get('http://localhost:8000/kamar', { headers: { Authorization: `Bearer ${token} ` } });
    return { props: { data: response.data.data, token: token } };
  } catch (error) {
    console.error(error);
    return { props: { data: [] } };
  }
}
