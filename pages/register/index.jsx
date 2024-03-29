import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { parseCookies } from 'nookies';
import Head from 'next/head';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [nama, setNama] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [isWrongPass, setIsWrongPass] = useState('');

  const saveUser = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setIsWrongPass('Kata sandi terlalu pendek');
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append('nama_user', nama);
    formData.append('foto', '');
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', 'tamu');
    try {
      const response = await axios.post('http://localhost:8000/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response?.data?.message);
      if (response?.data?.success === true) {
        setIsLoading(false);
        setNama('');
        setEmail('');
        setPassword('');
        router.push('/login');
      } else if (response?.data?.message === 'Email already exists') {
        setIsLoading(false);
        toast.error(`${response?.data?.message}`, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setEmail('');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register King</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/king.svg" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css" rel="stylesheet" />
      </Head>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme="dark" transition={Flip} />
      <>
        <section className="flex flex-col md:flex-row h-screen items-center">
          <div
            className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
          >
            <div className="w-full h-100">
              <Image src={'/logo/king.svg'} width={300} height={100} />
              {/* <h1 className="text-xl font-bold">Tailwind Login</h1> */}
              <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Create account</h1>

              <form className="mt-6" onSubmit={saveUser}>
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Enter Username"
                    className="w-full px-4 py-3 rounded-lg  mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    autofocus
                    autocomplete
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name=""
                    id=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email Address"
                    className="w-full px-4 py-3 rounded-lg  mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    autofocus
                    autocomplete
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    name=""
                    id=""
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setIsWrongPass('');
                    }}
                    className={`w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none ${isWrongPass === 'Kata sandi terlalu pendek' ? 'border-red-600 focus:border-red-600' : null} `}
                    required
                  />
                  {isWrongPass === 'Kata sandi terlalu pendek' ? <p className="text-red-600 mt-2 text-sm">{isWrongPass}</p> : null}
                </div>

                <div className="text-right mt-2">
                  {/* <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                  Forgot Password?
                </a> */}
                </div>

                <button
                  type="submit"
                  disabled={!nama || !email || !password}
                  className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6  disabled:bg-gray-500 disabled:text-gray-200"
                >
                  {isLoading ? 'Loading...' : 'Sign Up'}
                </button>
              </form>

              <hr className="my-6 border-gray-300 w-full" />

              <div className="flex justify-center items-center gap-x-3">
                <p className="">already have an account?</p>
                <Link href="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
                  Login Account
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
            <img src="/image/bg.jpg" alt="" className="w-full h-full object-cover" />
          </div>
        </section>
      </>
    </>
  );
};

export default Register;

export async function getServerSideProps(context) {
  const { token, role } = parseCookies(context);
  if (token) {
    return {
      redirect: {
        destination: `/${role === 'admin' ? '/admin' : '/'}`,
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
}
