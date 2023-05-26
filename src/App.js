import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import {SignUp} from "./Components/SignUp/signUp";
import {Login} from "./Components/Login/Login";
import {UserDataContext} from "./Context/appContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Dashboard} from "./Components/Dashboard/dashboard";

function App() {

    const toastContainerStyle = {
        width: '400px', // Set the desired width
    };

    const toastMessageStyle = {
        width: '100%', // Set the width to 100% to fill the container
    };

  return (
    <div className="App">
        <UserDataContext>
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Dashboard />} />
            </Routes>
            <ToastContainer style={toastContainerStyle} toastStyle={toastMessageStyle} />
        </UserDataContext>

    </div>
  );
}

export default App;
