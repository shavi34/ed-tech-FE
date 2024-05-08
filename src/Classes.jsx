import {useState} from 'react'
import {Link} from "react-router-dom";
import Pagination from "./Components/pagination.jsx";
import axiosInstance, {setHeaders} from "./Services/ApiService.js";

const Classes = ({user}) => {

  const [classes, setClasses] = useState([]);
  const [pagination, setPagination] = useState([]);

  const handleGetClasses = async (pageNum, pageSize) => {
    try {
      setHeaders();
      const response = await axiosInstance.get(`classes?page=${pageNum}&page_size=${pageSize}`);
      const {data, meta} = response.data;
      setClasses(data);
      setPagination(meta.links);
    } catch ({response}) {
      console.error('failed:', response);
    }
  };

  return (<>
    <div className="relative overflow-x-auto w-full rounded shadow-lg mt-6 py-4 px-3">
      <div className='flex justify-start'>
        <span className={'text-xl text-left font-medium'}>Classes </span>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-6">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Class name
          </th>
          <th scope="col" className="px-6 py-3">
            Number of Students
          </th>
          <th scope="col" className="px-6 py-3">
            Students
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
        </thead>
        <tbody>

        {classes.map((course, index) => (<tr
          key={index}
          className={index % 2 === 0 ? 'bg-white border-b dark:bg-gray-800 dark:border-gray-700' : 'bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700'}
        >
          <td
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer hover:underline">
            <Link to={`/classes/${course.id}`}>{course.name}</Link>
          </td>
          <td className="px-6 py-4">{course.student_count}
          </td>
          <td className="px-6 py-4">
            <div className={'grid grid-flow-col auto-cols-max'}>
              {course.students.slice(0, 4).map((student, index) => (<Link key={index} to={`/student/${student.id}`}>
                                    <span
                                      className={'bg-gray-500 text-white px-2 py-1 rounded-2xl mx-1 hover:bg-gray-700 cursor-pointer my-10'}
                                    >{student.name}</span>
                </Link>

              ))}
              {course.students.length > 5 ? (<Link to={`/classes/${course.id}`}>
                                    <span
                                      className={'bg-gray-500 text-white px-1 py-1 rounded-2xl mx-1 hover:bg-gray-700 cursor-pointer'}>...</span>
              </Link>) : ""}
            </div>
          </td>
          <td className="px-6 py-4">
            <Link to={`/classes/${course.id}`}>
              <button
                className={"bg-gray-700 text-white px-4 py-2 hover:bg-gray-900 hover::border-black"}>View
                Class
              </button>
            </Link>
          </td>
        </tr>))}
        </tbody>
      </table>

      <Pagination pagination={pagination} callback={handleGetClasses}/>
    </div>

  </>)
}
export default Classes;
