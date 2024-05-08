import './App.css'
import Login from "./login.jsx";
import {useEffect, useState} from "react";
import Classes from "./Classes.jsx";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Nav from "./Nav.jsx";
import ClassDetails from "./ClassDetails.jsx";
import Student from "./Student.jsx";
import axiosInstance, {setHeaders} from "./Services/ApiService.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedInUser = localStorage.getItem('token');
    if (loggedInUser) {
      getUser();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };


  const setLogin = (userDetails) => {
    const {data, token} = userDetails;
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setUser(data);
  };

  const getUser = async () => {
    try {
      setHeaders();
      const response = await axiosInstance.get('/user');
      setIsLoggedIn(true);
      setUser(response.data.data);
    } catch (error) {
      handleLogout();
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="App">
      <Router>
        {isLoggedIn ? (<Nav user={user} logout={handleLogout}/>) : ''}
        <Routes>
          <Route path="/" element={<Login onLogin={setLogin}/>}/>
          <Route path="/classes" element={<Classes user={user}/>}/>
          <Route path="/classes/:id" element={<ClassDetails/>}/>
          <Route path="/student/:id" element={<Student/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
