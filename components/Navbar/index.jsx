import React, { useState, useEffect, useRef } from 'react';
import { LoginModal } from '../Modal';
import { parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { token, email, nama, role, foto, id } = parseCookies();
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getUser = async () => {
    setIsLoading(true);
    try {
      const { token } = parseCookies();
      const response = await axios.get(`http://localhost:8000/user/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    destroyCookie(null, 'token');
    destroyCookie(null, 'role');
    destroyCookie(null, 'foto');
    destroyCookie(null, 'id');
    destroyCookie(null, 'nama');
    destroyCookie(null, 'email');
    router.push('/');
  };

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center">
            <Image src={'/logo/king.svg'} width={200} height={40} alt="logo" />
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap">King Hotel</span> */}
          </Link>
          <div className="flex gap-x-2 md:order-2">
            {token && isClient ? (
              <div className="flex items-center ml-3">
                <div>
                  <button type="button" className="flex text-sm  focus:ring-gray-300 " onClick={toggleMenu}>
                    <span className="sr-only">Open user menu</span>
                    {foto !== null ? (
                      <Image className="w-8 h-8 rounded-full" src={`http://localhost:8000/foto_user/${data?.foto}`} width={32} height={32} alt="user photo" />
                    ) : (
                      <Image className="w-8 h-8 rounded-full" src="/image/default.jpg" width={32} height={32} alt="default user photo" />
                    )}
                  </button>
                </div>
                {isMenuOpen && (
                  <div className="z-50 my-4 text-base list-none absolute right-16 top-10 bg-white divide-y divide-gray-100 rounded shadow" id="dropdown">
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-gray-900" role="none">
                        {data?.nama_user}
                      </p>
                      <p className="text-sm text-gray-900" role="none">
                        {data?.role}
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate" role="none">
                        {data?.email}
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <a onClick={() => router.push(`/settings`)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:hover:text-white" role="menuitem">
                          Settings
                        </a>
                      </li>
                      <li>
                        <a onClick={() => router.push('/transaction')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:hover:text-white" role="menuitem">
                          Detail Transaksi
                        </a>
                      </li>
                      <li>
                        <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:hover:text-white" role="menuitem">
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button onClick={() => setShowModal(true)} type="button" className="text-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 border-blue-600 border font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/register')}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign In
                </button>
              </>
            )}

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky"></div>
        </div>
      </nav>
      <LoginModal isVisible={showModal} close={() => setShowModal(false)} />
    </>
  );
};

export default Navbar;
