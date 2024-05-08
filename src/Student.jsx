import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useParams} from 'react-router-dom';
import axiosInstance, {setHeaders} from "./Services/ApiService.js";

const Student = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      handleGetClass();
    }
  }, []);

  const {id} = useParams();
  const handleGetClass = async () => {
    try {
      setHeaders();
      const response = await axiosInstance.get(`/students/${id}`);
      const {data} = response.data;
      setStudent(data);
    } catch (error) {
      console.error('failed:', error);
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto rounded shadow-lg mt-1 w-full py-4 px-3">
        <div className='border rounded shadow-sm my-4 py-2 px-4'>

          <div className='flex justify-start'>
            <span className={'text-xl text-left font-medium'}>Student Details</span>
          </div>

          <div className='flex justify-start'>
            <span className={'text-sm text-left font-medium'}>Student Name - {student.name}</span>
          </div>

          <div className='flex justify-start'>
            <span className={'text-sm text-left font-medium'}>Class Name - {student.class_name}</span>
          </div>

          <div className='flex justify-start'>
            <span className={'text-sm text-left font-medium'}>Address - {student.address}</span>
          </div>

          <div className='flex justify-start'>
            <span className={'text-sm text-left font-medium'}>Grade - {student.grade}</span>
          </div>

          <div className='flex justify-start'>
                        <span
                          className={'text-sm text-left font-medium'}>Total Activities - {student?.activity_count}</span>
          </div>

        </div>

        <div className='px-4 pt border py-2'>
          <div className='flex justify-start'>
            <span className={'text-xl text-left font-medium'}>Student Activities</span>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-6">
            <thead
              className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Activity name
              </th>
              <th scope="col" className="px-6 py-3">
                Score
              </th>
            </tr>
            </thead>
            <tbody>
            {student?.activities?.map((activity, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white border-b dark:bg-gray-800 dark:border-gray-700' : 'bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700'}
              >
                <td
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{activity?.subject}</td>
                <td className="px-6 py-4">{activity.score}</td>
              </tr>
            ))}


            </tbody>
          </table>
        </div>

      </div>

    </>
  )
}
export default Student;
