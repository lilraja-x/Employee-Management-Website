"use client"

import React, { useState, ChangeEvent, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [userEmail, setUserEmail] = useState('');

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    const userEmail = event.target.value;
    console.log('userEmail: ', userEmail);
    setUserEmail(userEmail);

    localStorage.setItem('userEmail', userEmail);
    console.log('userEmail In Local Storage: ', localStorage.getItem('userEmail'));
  }

  useEffect(() => {
    console.log('Local Storage: ', localStorage);
    const storedUserEmail = localStorage.getItem('userEmail');
    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className=" w-2/3 flex items-center justify-center bg-gray-100 md:bg-transparent">
        <div className="max-w-md w-full md:w-96 p-6 bg-white rounded-lg shadow-lg">
          <h1 className=" md:text-4xl text-left font-extrabold text-indigo-600 mb-4">
            Welcome to EMPLO<span className='text-4xl md:text-6xl'>EASE</span>
          </h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-600 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                onChange={handleEmailChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            {/* Fix Link component */}
            <Link
              href="/home"
            >
              {/* Use a <div> or another container instead of <a> */}
              <div className=' w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-300 m-4 ml-0'>
                Login
              </div>
            </Link>
          </form>
          {/* Uncomment the following lines */}
          {/* <p className="text-gray-600 mt-4 text-center md:text-left">
            Don't have an account?{' '}
            <Link href="/signup">
              <a className="text-blue-500">Sign up</a>
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
}