import React, { useState, useEffect } from 'react';
import { LoginModal } from '../Modal';
import { parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { token, email, nama, role, foto } = parseCookies();
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
      <nav class="bg-white fixed w-full z-20 top-0 left-0 dark:border-gray-600">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" class="flex items-center">
            <Image src={'/logo/king.svg'} width={200} height={40} alt="logo" />
            {/* <span class="self-center text-2xl font-semibold whitespace-nowrap">King Hotel</span> */}
          </Link>
          <div class="flex gap-x-2 md:order-2">
            {token && isClient ? (
              <div class="flex items-center ml-3">
                <div>
                  <button type="button" class="flex text-sm  focus:ring-gray-300 " onClick={toggleMenu}>
                    <span class="sr-only">Open user menu</span>
                    <img class="w-8 h-8 rounded-full" src={`http://localhost:8000/foto_user/${foto}`} alt="user photo" />
                  </button>
                </div>
                {isMenuOpen && (
                  <div class="z-50 my-4 text-base list-none absolute right-16 top-10 bg-white divide-y divide-gray-100 rounded shadow" id="dropdown">
                    <div class="px-4 py-3" role="none">
                      <p class="text-sm text-gray-900" role="none">
                        {nama}
                      </p>
                      <p class="text-sm text-gray-900" role="none">
                        {role}
                      </p>
                      <p class="text-sm font-medium text-gray-900 truncate" role="none">
                        {email}
                      </p>
                    </div>
                    <ul class="py-1" role="none">
                      <li>
                        <a onClick={handleLogout} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:hover:text-white" role="menuitem">
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button onClick={() => setShowModal(true)} type="button" class="text-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 border-blue-600 border font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">
                  Login
                </button>
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign In
                </button>
              </>
            )}

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <LoginModal isVisible={showModal} close={() => setShowModal(false)} />
    </>
  );
};

export default Navbar;
