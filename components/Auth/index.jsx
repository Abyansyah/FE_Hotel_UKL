import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { setCookie } from 'nookies';
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast, Flip } from 'react-toastify';

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPass, setIsPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (password.length < 8) {
      setIsPass('Kata sandi terlalu pendek');
      return;
    }
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/login', { email, password });
      if (response.status === 200) {
        const cookieOptions = {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
          overwrite: true,
        };
        close();
        setCookie(null, 'token', response.data.data.token, cookieOptions);
        setCookie(null, 'role', response.data.data.role, cookieOptions);
        setCookie(null, 'email', decodeURIComponent(response.data.data.email), cookieOptions);
        setCookie(null, 'id', response.data.data.id_user, cookieOptions);
        setCookie(null, 'nama', response.data.data.nama_user, cookieOptions);
        setCookie(null, 'foto', response.data.data.foto, cookieOptions);
        setEmail('');
        setPassword('');
        if (response?.data?.data?.role === 'admin') {
          router.push('/admin');
          setIsLoading(false);
        } else {
          router.push('/');
          setIsLoading(false);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setEmail('');
        setPassword('');
        setIsLoading(false);
        toast.error(`User tidak ditemukan`, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else {
        console.log('error', error);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme="dark" transition={Flip} />

      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img src="/image/bg.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
        >
          <div className="w-full h-100">
            <Image src={'/logo/king.svg'} width={300} height={100} />
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-3">Log account</h1>

            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name=""
                  id=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
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
                    setIsPass('');
                  }}
                  className={`w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none ${isPass === 'Kata sandi terlalu pendek' ? 'border-red-600 focus:border-red-600' : null} `}
                  required
                />
                {isPass === 'Kata sandi terlalu pendek' ? <p className="text-red-600 mt-2 text-sm">{isPass}</p> : null}
              </div>

              <div className="text-right mt-2">
                <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={!email || !password || password.length < 8}
                className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6 disabled:bg-gray-500 disabled:text-gray-200"
              >
                {isLoading ? 'Loading...' : 'Log In'}
              </button>
            </form>

            <hr className="my-6 border-gray-300 w-full" />

            <div className="flex justify-center gap-x-3">
              <p>Need an account?</p>
              <Link href="/register" className="text-blue-500 hover:text-blue-700 font-semibold">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
