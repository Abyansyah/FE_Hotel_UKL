import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { setCookie } from 'nookies';

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.PORT}/user/login`, { email, password });
      const cookieOptions = {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        overwrite: true,
      };
      setCookie(null, 'token', response.data.data.token, cookieOptions);
      setCookie(null, 'role', response.data.data.role, cookieOptions);
      setCookie(null, 'email', decodeURIComponent(response.data.data.email), cookieOptions);
      setCookie(null, 'id', response.data.data.id_user, cookieOptions);
      setCookie(null, 'nama', response.data.data.nama_user, cookieOptions);
      setCookie(null, 'foto', response.data.data.foto, cookieOptions);
      router.push('/admin');
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

  return (
    <>
      <section class="flex flex-col md:flex-row h-screen items-center">
        <div class="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img src="/image/bg.jpg" alt="" class="w-full h-full object-cover" />
        </div>

        <div
          class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
        >
          <div class="w-full h-100">
            <h1 class="text-xl font-bold">Tailwind Login</h1>
            <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

            <form class="mt-6" onSubmit={handleSubmit}>
              <div>
                <label class="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name=""
                  id=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                  required
                />
              </div>

              <div class="mt-4">
                <label class="block text-gray-700">Password</label>
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div class="text-right mt-2">
                <a href="#" class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>

            <hr class="my-6 border-gray-300 w-full" />

            <p class="mt-8">
              Need an account?
              <a href="#" class="text-blue-500 hover:text-blue-700 font-semibold">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
