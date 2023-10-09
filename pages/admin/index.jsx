import { Sidebar } from 'ahmad/components';
import { parseCookies } from 'nookies';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { MdBedroomChild } from 'react-icons/md';

const Admin = () => {
  const [user, setUser] = useState();
  const [tipe, setTipe] = useState();

  const getUser = async () => {
    const { token } = parseCookies();
    try {
      const response = await axios.get(`http://localhost:8000/user/getAll`, { headers: { Authorization: `Bearer ${token} ` } });
      const data = response.data;
      setUser(data.count);
    } catch (error) {
      console.log(error);
    }
  };
  const getTipeKamar = async () => {
    const { token } = parseCookies();
    try {
      const response = await axios.get(`http://localhost:8000/tipe`, { headers: { Authorization: `Bearer ${token} ` } });
      const data = response.data;
      setTipe(data.count);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
    getTipeKamar();
  }, []);
  return (
    <>
      <Sidebar>
        <div class="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3">
          <div class="items-center gap-x-6 justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div class="w-full flex items-center text-white gap-6 text-3xl md:text-4xl">
              <FaUser />
              <div className="">
                {' '}
                <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">Jumlah User</h3>
                <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">{user}</span>
                <p class="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                  <span class="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400"></span>
                </p>
              </div>
            </div>
            <div class="w-full" id="new-products-chart"></div>
          </div>
          <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div class="w-full gap-6 items-center text-white text-3xl flex md:text-4xl">
              <MdBedroomChild />
              <div>
                <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">Tipe Kamar</h3>
                <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">{tipe}</span>
              </div>
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
  const { token, role } = parseCookies(context);
  if (!token && role === 'tamu') {
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
