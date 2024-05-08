import {useEffect, useState} from 'react'
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import {useParams} from 'react-router-dom';
import Pagination from "./Components/pagination.jsx";
import axiosInstance, {setHeaders} from "./Services/ApiService.js";

const ClassDetails = () => {


  const navigate = useNavigate();
  const [course, setCourse] = useState({});
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState([]);
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
      setHeaders()
      const response = await axiosInstance.get(`/classes/${id}`);
      const {data} = response.data;
      setCourse(data);
    } catch (error) {
      console.error('failed:', error);
    }
  };


  const handleGetStudents = async (pageNum, pageSize) => {
    try {
      setHeaders()
      const response = await axiosInstance.get(`/classes/${id}/students?page=${pageNum}&page_size=${pageSize}`);
      const {data, meta} = response.data;
      setStudents(data);
      setPagination(meta.links);
    } catch (error) {
      console.error('failed:', error);
    }
  };


  return (
    <>
      <div className="relative overflow-x-auto w-full rounded shadow-lg mt-6 py-4 px-3">
        <div className='flex justify-start'>
          <span className={'text-xl text-left font-medium'}>Class Students</span>
          <div
            className={'text-xs text-left font-medium bg-yellow-400 rounded-lg px-5 py-1 ml-2'}>{course.name}</div>
        </div>
        <div className='flex justify-start'>
          <span className={'text-sm text-left font-medium'}>Total Students - {course?.student_count}</span>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-6">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Student name
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Grade
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
          </thead>
          <tbody>
          {students?.map((student, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-white border-b dark:bg-gray-800 dark:border-gray-700' : 'bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700'}
            >
              <td
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer hover:underline">
                <Link to={`/student/${student.id}`}>
                  {student.name}
                </Link>
              </td>
              <td className="px-6 py-4">{student.address}</td>
              <td className="px-6 py-4">{student.grade}</td>
              <td className="px-6 py-4">
                <Link to={`/student/${student.id}`}>
                  <button
                    className={"bg-gray-700 text-white px-4 py-2 hover:bg-gray-900 hover::border-black"}>View
                    Student
                  </button>
                </Link>
              </td>
            </tr>
          ))}


          </tbody>
        </table>

        <Pagination pagination={pagination} callback={handleGetStudents}/>
      </div>

    </>
  )
}
export default ClassDetails;
