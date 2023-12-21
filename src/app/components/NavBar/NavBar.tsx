"use client"

import Link from "next/link";
import {useState, useEffect} from 'react';
import '@fontsource/rajdhani';


export default function NavBar() {
  const[userEmail, setUserEmail] = useState('');
  useEffect(() => {
		const storedUserEmail = localStorage.getItem('userEmail');
		console.log('Local Storage:', localStorage);
		if (storedUserEmail) {
		  setUserEmail(storedUserEmail);
		}
	  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('id');
    localStorage.removeItem('employee_name');
    localStorage.removeItem('employee_salary');
    localStorage.removeItem('employee_age');
  };
  return (
    <header className='p-4 bg-slate-600 w-screen md:w-30 md:h-screen flex flex-row md:flex-col justify-between' style={{ width: '100%' }}>
      <div>
        <h1 className="text-white text-4xl font-extrabold font-mono mb-2">EMPLO<span className="font-rajdhani text-5xl">EASE</span></h1>
        <nav className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 p-4">
          <Link href="/home" className="text-white hover:text-gray-300 transition duration-300">
            Home
          </Link>
          <Link href="/employees" className="text-white hover:text-gray-300 transition duration-300">
            Employees
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <p className="text-white text-xs md:text-base hover:text-gray-300 transition duration-300">{userEmail}</p>
        <Link href="/" >
          <button className="text-white hover:text-gray-300 transition duration-300" onClick={handleLogout}>
            Logout
          </button>
        </Link>
      </div>
    </header>
  );
}
