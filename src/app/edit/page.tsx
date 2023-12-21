"use client"

import React, { useState, useEffect, ChangeEvent } from 'react';
import NavBar from '../components/NavBar/NavBar';


export default function EditPage() {


    const [id, setId] = useState('');
    const [employee_name, setEmployee_name] = useState('');
    const [employee_salary, setEmployee_salary] = useState('');
    const [employee_age, setEmployee_age] = useState('');

    useEffect(() => {
		const storedId = localStorage.getItem('id');
        const storedEmployee_name = localStorage.getItem('employee_name');
        const storedEmployee_salary = localStorage.getItem('employee_salary');
        const storedEmployee_age = localStorage.getItem('employee_age');
        if (storedId && storedEmployee_salary && storedEmployee_age && storedEmployee_name) {
		console.log('Local Storage:', localStorage);
		  setId(storedId);
          setEmployee_name(storedEmployee_name);
          setEmployee_salary(storedEmployee_salary);
          setEmployee_age(storedEmployee_age);
        }
	  }, []);

    function handleEmployeeNameChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setEmployee_name(value);
        console.log('employee_name: ', value);
    }

    function handleEmployeeAgeChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setEmployee_age(value);
        console.log('employee_age: ', value);
    }

    function handleEmployeeSalaryChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setEmployee_salary(value);
        console.log('employee_name: ', value);
    }

    const handleEditButtonClick = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('localStorage: ' + localStorage);
        try{
            const response = await fetch('/api', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    employee_name: employee_name,
                    employee_salary: employee_salary,
                    employee_age: employee_age,
                }),
            });
            if (response.ok) {
                alert('Employee updated successfully');
            } else {
                console.log("Error: ", response);
            }
        } catch (error) {
            console.log('Error: ', error);
        }        
        localStorage.removeItem('id');
        localStorage.removeItem('employee_name');
        localStorage.removeItem('employee_salary');
        localStorage.removeItem('employee_age');
        console.log('localStorage After Edit Api Hit: ' + localStorage);
    }

    return(
        <div className='bg-gray-300 flex flex-col md:flex-row  top-0 w-screen h-screen'>
        <div className='top-0'>
            <NavBar/>
        </div>

        <div className=' flex w-full items-center justify-center'>
        <div className='w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mt-8 p-4'>
            <div className=' rounded-3xl bg-white shadow-lg p-12'>
            <h4 className=' text-1xl font-medium mb-4 text-center'>Edit this Employee</h4>

            <form className='flex flex-col space-y-4' onSubmit={handleEditButtonClick}>
                <div>
                <label htmlFor='name' className='text-sm font-semibold'>
                    Name:
                </label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    value={employee_name as string}
                    onChange={handleEmployeeNameChange}
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
                        value={employee_salary as string}
                        onChange={handleEmployeeSalaryChange}
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
                        value={employee_age as string}
                        onChange={handleEmployeeAgeChange}
                        className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300'
                    />
                </div>

                <button
                type='submit'
                className='bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
                >
                Edit
                </button>
            </form>
            </div>
        </div>
        </div>
    </div>
    );
}