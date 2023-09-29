import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { setCookie } from 'nookies';
import Link from 'next/link';

const LoginModal = ({ isVisible, close }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isWrongEmail, setIsWrongEmail] = useState(false);
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (!email) {
      setIsWrongEmail(true);
    } else if (!password) {
      setIsWrongPassword(true);
    }
    e.preventDefault();
    setIsLoading(true);
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
        } else {
          router.push('/');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('User tidak ditemukan');
        setEmail('');
        setPassword('');
      } else {
        console.log('error', error);
      }
    }
  };

  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target.id === 'tambah') close();
  };
  return (
    <div className="fixed  top-0 left-0 right-0 z-50 flex justify-center items-center w-full p-4 overflow-x-hidden bg-gray-800/50 overflow-y-auto md:inset-0 h-screen" onClick={handleClose}>
      <div className="relative w-full max-w-md max-h-full animate-fade-in-up">
        <div className="relative bg-white rounded-lg shadow ">
          <button
            type="button"
            onClick={() => {
              close();
              setEmail('');
              setPassword('');
            }}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 ">Login</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsWrongEmail(false);
                  }}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ${isWrongEmail ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : ''} focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  placeholder="name@company.com"
                />
                {isWrongEmail && <p className="pt-2 text-xs text-red-600 ">Email tidak boleh kosong</p>}
              </div>
              <div>
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setIsWrongPassword(false);
                  }}
                  placeholder="••••••••"
                  className={`1bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ${
                    isWrongPassword ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : ''
                  } focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                />
                {isWrongPassword && <p className="pt-2 text-xs text-red-600 ">Password tidak boleh kosong</p>}
              </div>
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 " />
                  </div>
                  <label for="remember" className="ml-2 text-sm font-medium text-gray-900 ">
                    Remember me
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login to your account
              </button>
              <button onClick={() => router.push('/login')} className="text-sm w-full flex justify-center gap-1 font-medium text-gray-500 dark:text-gray-300">
                Not registered? <p className="text-blue-700 hover:underline dark:text-blue-500">Create account</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
