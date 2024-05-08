import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

const Pagination = ({callback, pagination}) => {


    const navigate = useNavigate();
    const [pageNum, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            callback(pageNum, pageSize);
        }

    }, [pageNum]);

    useEffect(() => {
        setPage(1);
        callback(pageNum, pageSize);
    }, [pageSize]);

    const handlePages = (state) => {
        if (state === "Previous" && pageNum > 1) {
            setPage(pageNum - 1);
        } else if (state === "Next" && pagination[pagination.length - 2]?.active === false) {
            setPage(pageNum + 1);
        }
    };
    return (
        <>
            <nav aria-label="Page navigation pt-5" className={''}>
                <div className='flex justify-between pt-5'>
                    <ul className="flex courses-center -space-x-px h-8 text-sm">
                        <li>
                            <a href="#" onClick={() => {
                                handlePages('Previous')
                            }}
                               className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="M5 1 1 5l4 4"/>
                                </svg>
                            </a>
                        </li>
                        {pagination.map((page, index) => (

                            <span key={index}>
                                 {page.label > 0 ? (
                                     <li>
                                         <a href="#" onClick={() => {
                                             setPage(parseInt(page.label))
                                         }}
                                            className={`flex items-center justify-center px-3 h-8 leading-tight ${parseInt(page.label) === pageNum ? `text-blue-500  border-blue-300 hover:bg-blue-100 hover:text-blue-700` : `text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700`}  bg-white border  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{page.label}</a>
                                     </li>
                                 ) : ''}
                            </span>

                        ))}
                        <li>
                            <a href="#" onClick={() => handlePages('Next')}
                               className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Next</span>
                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                    <select defaultValue={pageSize} onChange={(e) => {
                        setPageSize(e.target.value)
                    }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={40}>40</option>
                    </select>
                </div>

            </nav>
        </>
    )
}
export default Pagination;
