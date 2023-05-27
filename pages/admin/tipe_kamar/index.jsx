import { Delete, Modal, Sidebar } from 'ahmad/components';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import axios from 'axios';

const Tipe = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setEdit] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [hasil, setHasil] = useState(data);
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [foto, setFoto] = useState('');
  const [tipeId, settipeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [prev, setPrev] = useState('');
  const { role } = parseCookies();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFoto(image);
    setPrev(URL.createObjectURL(image));
  };

  const handleAdd = () => {
    setShowModal(true);
    setNama('');
    setFoto('');
    setHarga('');
    setDeskripsi('');
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    console.log('tes');
    const formData = new FormData();
    const { token } = parseCookies();
    formData.append('nama_tipe_kamar', nama);
    formData.append('foto', foto);
    formData.append('harga', harga);
    formData.append('deskripsi', deskripsi);
    try {
      await axios.post(`${process.env.PORT}/tipe/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setShowModal(false);
      const response = await axios.get(`${process.env.PORT}/tipe`, { headers: { Authorization: `Bearer ${token}` } });
      setHasil(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (userId) => {
    settipeId(userId);
    setEdit(true);
    try {
      const { token } = parseCookies();
      const response = await axios.get(`${process.env.PORT}/tipe/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.data;
      console.log(userData);
      setNama(userData.nama_tipe_kamar);
      setFoto(userData.foto);
      setHarga(userData.harga);
      setDeskripsi(userData.deskripsi);
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = async (e) => {
    e.preventDefault();
    const { token } = parseCookies();
    const formData = new FormData();
    formData.append('nama_tipe_kamar', nama);
    formData.append('foto', foto);
    formData.append('harga', harga);
    formData.append('deskripsi', deskripsi);
    try {
      await axios.put(`${process.env.PORT}/tipe/${tipeId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setEdit(false);
      const response = await axios.get(`${process.env.PORT}/tipe`, { headers: { Authorization: `Bearer ${token}` } });
      setHasil(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    setDelete(true);
    settipeId(id);
  };

  const deleteUser = async (id) => {
    const { token } = parseCookies();
    try {
      await axios.delete(`${process.env.PORT}/tipe/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setDelete(false);
      const response = await axios.get(`${process.env.PORT}/tipe`, { headers: { Authorization: `Bearer ${token}` } });
      setHasil(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = () => {
    const filteredUsers = data.filter((user) => {
      return user.nama_tipe_kamar.toLowerCase().includes(searchQuery.toLowerCase()) || user.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setHasil(filteredUsers);
  };

  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
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
                        Tipe Kamar
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All Tipe Kamar</h1>
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
                <div class="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0">
                  <a href="#" class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a href="#" class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a href="#" class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div class="flex items-center ml-auto space-x-2 sm:space-x-3">
                {role === 'admin' ? (
                  <button
                    type="button"
                    onClick={() => handleAdd()}
                    class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                    Add Tipe
                  </button>
                ) : null}
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
                        Kelas
                      </th>
                      <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        harga
                      </th>
                      <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                        Deskripsi
                      </th>
                      {role === 'admin' ? (
                        <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                          Actions
                        </th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {hasil.length === 0 ? (
                      <tr>
                        <td colSpan="5" class="p-4 text-center font-normal text-gray-900 whitespace-nowrap dark:text-white">
                          Tipe not found
                        </td>
                      </tr>
                    ) : (
                      <>
                        {hasil.map((tipe, index) => (
                          <tr class="hover:bg-gray-100 dark:hover:bg-gray-700 " key={index}>
                            <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                            <td class="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                              <img class="w-8 h-8 rounded-full" src={'http://localhost:8000/foto_tipe_kamar/' + tipe.foto} alt="user photo" />
                              <div class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                <div class="text-base font-semibold text-gray-900 dark:text-white">{tipe.nama_tipe_kamar}</div>
                              </div>
                            </td>

                            <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">{formatIDR(tipe.harga)}</td>
                            <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">{tipe.deskripsi}</td>
                            {role === 'admin' ? (
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
                                  Edit user
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
                                  Delete user
                                </button>
                              </td>
                            ) : null}
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

      {/* Modal Add */}
      <Modal isVisible={showModal} close={() => setShowModal(false)} judul={'add Tipe'}>
        <form onSubmit={saveProduct}>
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nama Tipe
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Bonnie"
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Harga
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Bonnie"
                />
              </div>
              <div class="col-span-6">
                <label for="foto" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Foto
                </label>
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    {prev ? (
                      <div className="flex ">
                        <img src={prev} alt="Prev Image" width={150} className="object-cover" />
                      </div>
                    ) : (
                      <>
                        <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </>
                    )}
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" onChange={loadImage} />
                </label>
              </div>
              <div class="col-span-6 ">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Deskripsi
                </label>
                <textarea
                  id="biography"
                  rows="4"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Deskripsi"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="submit"
            >
              Add user
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Edit */}
      <Modal isVisible={showEdit} close={() => setEdit(false)} judul={'Edit Tipe'}>
        <form onSubmit={editProduct}>
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nama Tipe
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Bonnie"
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Harga
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Bonnie"
                />
              </div>
              <div class="col-span-6">
                <label for="foto" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Foto
                </label>
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    {prev ? (
                      <div className="flex ">
                        <img src={prev} alt="Prev Image" width={150} className="object-cover" />
                      </div>
                    ) : (
                      <>
                        <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </>
                    )}
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" onChange={loadImage} />
                </label>
              </div>
              <div class="col-span-6 ">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Deskripsi
                </label>
                <textarea
                  id="biography"
                  rows="4"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Deskripsi"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="submit"
            >
              Add user
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Delete */}
      <Delete isVisible={showDelete} close={() => setDelete(false)}>
        <a
          href="#"
          onClick={() => deleteUser(tipeId)}
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

export default Tipe;

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
    const response = await axios.get(`${process.env.PORT}/tipe`, { headers: { Authorization: `Bearer ${token} ` } });
    return { props: { data: response.data.data, token: token } };
  } catch (error) {
    console.error(error);
    return { props: { data: [] } };
  }
}
