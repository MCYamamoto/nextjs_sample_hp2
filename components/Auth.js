import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'universal-cookie';
import Image from 'next/image';
import { LockClosedIcon } from '@heroicons/react/solid';

const cookie = new Cookie();

const Auth = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const login = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_URL}api/auth/jwt/create/`,
        {
          method: 'POST',
          body: JSON.stringify({ username: username, password: password }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 400) {
        throw 'authentication faled';
      }
      const data = await res.json();
      const options = { path: '/' };
      cookie.set('access_token', data.access, options);
      setIsLogin(true);
      router.push('/main-page');
    } catch (err) {
      alert(err);
    }
  };

  const authUser = async (e) => {
    e.preventDefault();
    if (isLogin) {
      login();
    } else {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REST_API_URL}api/register/`,
          {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (res.status === 400) {
          throw 'authentication faled';
        }
        login();
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='flex flex-col justify-center'>
          <Image
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
            width={100}
            height={100}
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
            {isLogin ? 'Login' : 'Sign up'}
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={authUser}>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                name='username'
                type='text'
                autoComplete='username'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='UserName'
                value={username}
                onChange={(e) => {
                  setUsername(e.currentTarget.value);
                }}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Password'
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              />
            </div>
          </div>

          <div className='flex items-center justify-center'>
            <div className='text-sm'>
              <span
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
                className='font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer'
              >
                change mode ?
              </span>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              <span className='absolute left-0 inset-y-0 flex items-center pl-3 '>
                <LockClosedIcon
                  className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                  aria-hidden='true'
                />
              </span>
              {isLogin ? 'Login with JWT' : 'Create new user'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Auth;
