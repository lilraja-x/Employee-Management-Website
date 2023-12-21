import fs from 'fs/promises';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const dataFilePath = path.resolve('data.json');


interface Employee {
  id: string;
  employee_name: string;
  employee_salary: string;
  employee_age: string;
}

async function readDataFile(): Promise<{ data: Employee[] }> {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return { data: [] };
  }
}

async function writeDataFile(data: { data: Employee[] }): Promise<void> {
  try {
    const existingData = await readDataFile();
    const maxId = existingData.data.reduce((max, employee) => Math.max(max, parseInt(employee.id, 10) || 0), 0);
    const newId = String(maxId + 1);

    const newEmployee: Employee = {
      id: newId,
      employee_name: data.data[data.data.length - 1].employee_name || '',
      employee_salary: data.data[data.data.length - 1].employee_salary || '',
      employee_age: data.data[data.data.length - 1].employee_age || '',
    };

    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
}




export async function GET() {
  try {
      const { data } = await readDataFile();
      return Response.json({ data });
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json({ error: 'Internal Server Error' });
  }
}

export async function POST(req: Request) {
  try {
    const { data } = await readDataFile();
    const requestBody = await req.json();
    const newEmployee: Employee = { id: String(data.length + 1), ...requestBody };
    data.push(newEmployee);
    await writeDataFile({ data });
    return Response.json(newEmployee);
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json({ error: 'Internal Server Error' });
  }
}

export async function PUT(req: Request) {
  try {
      const { data } = await readDataFile();
      const requestBody = await req.json();
      const { id, ...updatedEmployee } = requestBody;
      const index = data.findIndex((employee) => employee.id === id);
      if (index !== -1) {
        data[index] = { id, ...updatedEmployee };
        await writeDataFile({ data });
        return Response.json({ success: true });
    } else {
      return Response.json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json({ error: 'Internal Server Error' });
  }
}

export async function DELETE(req: Request) {
  try {
      const { data } = await readDataFile();
      const requestBody = await req.json();
      const { id } = requestBody;
      const filteredData = data.filter((employee) => employee.id !== id);
      if (filteredData.length < data.length) {
        await writeDataFile({ data: filteredData });
        return Response.json({ success: true });
      } else {
        return Response.json({ error: 'Employee not found' });
      }
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json({ error: 'Internal Server Error' });
  }
}
