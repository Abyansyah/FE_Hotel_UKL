import { Sidebar } from 'ahmad/components';
import { parseCookies } from 'nookies';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [user, setUser] = useState();

  const getUser = async () => {
    const { token } = parseCookies();
    try {
      const response = await axios.get('http://localhost:8000/user/getAll', { headers: { Authorization: `Bearer ${token} ` } });
      const data = response.data;
      setUser(data.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Sidebar>
        <div class="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3">
          <div class="items-center gap-x-6 justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="120" height="120">
              <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"></path>
            </svg>
            <div class="w-full">
              <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">Jumlah User</h3>
              <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">{user}</span>
              <p class="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                <span class="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400"></span>
              </p>
            </div>
            <div class="w-full" id="new-products-chart"></div>
          </div>
          <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div class="w-full">
              <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">Tipe Kamar</h3>
              <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">2,340</span>
              <p class="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                <span class="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"></path>
                  </svg>
                  12.5%
                </span>
                Since last month
              </p>
            </div>
            <div class="w-full" id="new-products-chart"></div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Admin;

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
