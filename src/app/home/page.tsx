"use client"

import React, {useState, ChangeEvent, useEffect} from 'react';
import NavBar from '../components/NavBar/NavBar';


export default function Home() {
	const [salary, setSalary] = useState('');
	const [age, setAge] = useState('');
	const [userName, setUserName] = useState('');

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setUserName(value);
		console.log('name: ', userName);
	}

	const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.replace(/[^0-9]/g, '');
		setAge(value);
		console.log('age: ', age);
	};

	const handleSalaryChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.replace(/[^0-9]/g, '');
		setSalary(value);
		console.log('salary: ', salary);
	};

	const handleAddButtonClick = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
		  const requestBody = {
			employee_name: userName,
			employee_salary: salary,
			employee_age: age,
		  };
	  
		  const response = await fetch('/api', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		  });
	  
		  if (response.ok) {
			alert('Employee added successfully');
	  
			setUserName('');
			setAge('');
			setSalary('');
		  } else {
			console.log('Error: ', response);
		  }
		} catch (error) {
		  console.log('Error: ', error);
		}
	  };
	  

	return (
		<div className='bg-gray-300 flex flex-col md:flex-row  top-0 w-screen h-screen'>
      <div className='top-0'>
        <NavBar/>
      </div>
		
		<div className=' flex w-full items-center justify-center'>
      <div className='w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mt-8 p-4'>
        <div className=' rounded-3xl bg-white shadow-lg p-12'>
          <h2 className='text-2xl font-bold mb-1 text-center'>Welcome admin!</h2>
          <h4 className=' text-1xl font-medium mb-4 text-center'>Add an Employee</h4>

          <form className='flex flex-col space-y-4' onSubmit={handleAddButtonClick}>
            <div>
              <label htmlFor='name' className='text-sm font-semibold'>
                Name:
              </label>
              <input
                type='text'
                id='name'
                name='name'
				value={userName}
				onChange={handleNameChange}
                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>

            <div>
              <label htmlFor='salary' className='text-sm font-semibold'>
                salary:
              </label>
              <div className='flex'>
					<span className='px-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-100 pt-2'>
					PKR
					</span>
					<input
					type='text'
					id='salary'
					name='salary'
					value={salary}
					onChange={handleSalaryChange}
					className='flex-1 border border-l-0 border-gray-300 p-2 rounded-r-md focus:outline-none focus:ring focus:border-blue-300 w-12'
					/>
				</div>
            </div>

            <div>
				<label htmlFor='age' className='text-sm font-semibold'>
					Age:
				</label>
				<input
					type='text'
					id='age'
					name='age'
					value={age}
					onChange={handleAgeChange}
					className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300'
				/>
			</div>

            <button
              type='submit'
              className='bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
            >
              Add
            </button>
          </form>
        </div>
      </div>
	  </div>
    </div>
	)
}
