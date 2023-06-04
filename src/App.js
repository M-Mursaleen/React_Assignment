import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import { Provider } from 'react-redux';

import {SignUp} from "./Components/SignUp/signUp";
import {Login} from "./Components/Login/Login";
import {UserDataContext} from "./Context/appContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Dashboard} from "./Components/Dashboard/dashboard";
import CryptoExchange from "./Components/crypto/crypto";
import store from "./redux/store";
import TransferData from "./Components/crypto/RowData";

function App() {

    const toastContainerStyle = {
        width: '400px', // Set the desired width
    };

    const toastMessageStyle = {
        width: '100%', // Set the width to 100% to fill the container
    };

  return (
    <div className="App">
        <Provider store={store}>
            <UserDataContext>
                <Routes>
                    <Route path="/" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Dashboard />} />
                    <Route path="/crypto-exchange" element={<CryptoExchange />} />
                    <Route path="/transfer" element={<TransferData />} />

                </Routes>
                <ToastContainer style={toastContainerStyle} toastStyle={toastMessageStyle} />
            </UserDataContext>
        </Provider>
    </div>
  );
}

export default App;
