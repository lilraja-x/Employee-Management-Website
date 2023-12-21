"use client"

import React, { useEffect, useState} from 'react';
import NavBar from '../components/NavBar/NavBar';
import Link from 'next/link';

interface EmployeeProps {
    id: string;
    employee_name: string;
    employee_salary: string;
    employee_age: string;
}

export default function Employees() {
    const [employeeData, setEmployeeData] = useState<EmployeeProps[]>([]);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    async function fetchData() {
        try {
            const response = await fetch('/api');
            const result = await response.json();
            setEmployeeData(result.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

    function handleEditButtonClick(employee: EmployeeProps) {
        localStorage.setItem('id', employee.id);
        localStorage.setItem('employee_name', employee.employee_name);
        localStorage.setItem('employee_salary', employee.employee_salary);
        localStorage.setItem('employee_age', employee.employee_age);
    }

    async function handleDeleteButtonClick(employee_id: string) {
        try {
          const response = await fetch('/api', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
             id:employee_id
            }),
          });
          if (response.ok) {
            await fetchData();
            alert('Employee deleted successfully');
          } else {
            console.log('Error:', response);
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }

    return (
        <div className='overflow-hidden bg-gray-300 flex flex-col md:flex-row  top-0 w-screen h-screen overflow-x-hidden'>
            <div className='top-0'>
                <NavBar/>
            </div>
            <div className=' border-2 bolder-solid border-black md:w-screen m-4 overflow-auto border-separate' 
            style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'black blue'
            }}
            >
                <table className="overflow-auto min-w-full bg-white border border-gray-300">
                    <thead className='sticky top-0 bg-white'>
                    <tr>
                        <th className="border border-gray-300 p-2 bg-slate-600 text-white">ID</th>
                        <th className="border border-gray-300 p-2 bg-slate-600 text-white">Name</th>
                        <th className="border border-gray-300 p-2 bg-slate-600 text-white">Salary</th>
                        <th className="border border-gray-300 p-2 bg-slate-600 text-white">Age</th>
                        <th className="border border-gray-300 p-2 bg-slate-600 text-white">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employeeData.map((employee) => (
                        <tr key={employee.id}>
                        <td className="border border-gray-300 p-2">{employee.id}</td>
                        <td className="border border-gray-300 p-2">{employee.employee_name}</td>
                        <td className="border border-gray-300 p-2">{employee.employee_salary}</td>
                        <td className="border border-gray-300 p-2">{employee.employee_age}</td>
                        <td className="border border-gray-300 p-2 flex flex-row flex-wrap">
                            <Link href="/edit">
                                <button className="bg-blue-500 text-white px-2 py-1 md:mr-2 m-2" onClick={() => handleEditButtonClick(employee)}>
                                ✏️ <span className=" text-center text-lg font-semibold hidden md:inline">Edit</span>
                                </button>
                            </Link>

                            <button className="bg-red-500 text-white px-2 py-1 md:mr-2 m-2" onClick={() => handleDeleteButtonClick(employee.id)}>
                                🗑️ <span className=" text-center text-lg font-semibold hidden md:inline">Delete</span>
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
