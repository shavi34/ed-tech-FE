import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {UserRole} from "./Enums/Roles.js";
import axiosInstance from "./Services/ApiService.js";
import axios from "axios";
import Swal from 'sweetalert2'

const Login = ({onLogin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        fetchCsrfToken();
    }, []);

    const fetchCsrfToken = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${apiUrl}/sanctum/csrf-cookie`);
            document.cookie = `csrfToken=${response.data.csrfToken}; Path=/`;

        } catch ({response}) {
            console.error('Error fetching CSRF token:', response);
        }
    };

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/login', {
                email: email,
                password: password,
            });
            onLogin(response.data);
            if (response.data.data.role_id === UserRole.STUDENT) {
                return navigate(`/student/${response.data.data.student_id}`);
            }

            return navigate(`/classes`);

        } catch ({response}) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response?.data?.message,
            });
            console.error('Login failed:', response);
        }
    };


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center h-full pt-72 px-6 py-12 lg:px-8 w-full">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=teal&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email"
                                   className="block text-sm text-left font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-teal-600 hover:text-teal-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}
export default Login;
