import { Navbar } from 'ahmad/components';
import React, { useState, useEffect } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import { Flip, ToastContainer, toast } from 'react-toastify';

const Settings = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState('');
  const [password, setPassword] = useState('');
  const { id } = parseCookies();

  const getUser = async () => {
    setIsLoading(true);
    try {
      const { token } = parseCookies();
      const response = await axios.get(`http://localhost:8000/user/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setData(response.data.data);
      setUserName(response.data.data.nama_user);
      setFoto(response.data.data.foto);
      setEmail(response.data.data.email);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  const editUser = async (e) => {
    e.preventDefault();
    const { token } = parseCookies();
    const formData = new FormData();
    formData.append('nama_user', userName);
    formData.append('foto', foto);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', 'tamu');
    const ids = toast.loading('Please wait...');
    try {
      await axios
        .put(`http://localhost:8000/user/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.update(ids, { render: 'Success Update', autoClose: 3000, type: 'success', isLoading: false, hideProgressBar: false, closeOnClick: true });
          setPassword('');
          getUser();
        })
        .catch((err) => {
          toast.update(ids, { render: 'Something went wrong', type: 'error', isLoading: false });
        });
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  const loadImage = (e) => {
    const image = e.target.files[0];

    if (image) {
      const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
      const maxSize = 1 * 1024 * 1024;

      if (allowedFormats.includes(image.type) && image.size <= maxSize) {
        setFoto(image);
      } else {
        let message = 'Please select a PNG, JPEG, or JPG file.';
        if (image.size > maxSize) {
          message = 'file maximum (1 MB).';
        }
        toast.warn(`${message}`, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        e.target.value = '';
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme="light" transition={Flip} />
      <Navbar />
      <form className="pt-28 mx-44" onSubmit={editUser}>
        <section>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      type="text"
                      name="username"
                      id="username"
                      className="block flex-1 border-0 focus:rounded-md bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 focus:rounded-md bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="text"
                      name="username"
                      id="username"
                      placeholder="••••••••"
                      autoComplete="username"
                      className="block flex-1 border-0 focus:rounded-md bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {foto === null ? (
                    <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                  ) : (
                    <Image className="h-12 w-12 object-cover rounded-full text-gray-300" src={`http://localhost:8000/foto_user/${foto}`} width={48} height={48} />
                  )}
                  <input onChange={loadImage} type="file" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" />
                </div>
              </div>

              <button type="submit" className="bg-blue-600 py-2 text-white rounded">
                Save
              </button>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default Settings;

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
