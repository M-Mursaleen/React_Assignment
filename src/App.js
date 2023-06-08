import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";

import React, {useContext} from "react";
import { Provider } from 'react-redux';

import {SignUp} from "./Components/SignUp/signUp";
import {Login} from "./Components/Login/Login";
import { UserDataContext} from "./Context/appContext";
import loggedInContext from "./Context/loggedInContext"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Dashboard} from "./Components/Dashboard/dashboard";
import store from "./redux/store";
import TransferData from "./Components/currencyConverter/RowData";
import Protected from "./ProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";

const CryptoExchange = React.lazy(() => import('./Components/crypto/crypto'));


function App() {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    console.log('===>',isLoggedIn)
    const toastContainerStyle = {
        width: '400px', // Set the desired width
    };

    const toastMessageStyle = {
        width: '100%', // Set the width to 100% to fill the container
    };

  return (
    <div className="App">
        <Provider store={store}>
            <loggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>

                <UserDataContext>
                    <Routes>
                        <Route path="/" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/home" element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                        />
                        <Route path="/crypto-exchange" element={
                            <React.Suspense fallback={<p className={'text-center'}>Loading...</p>}>
                                <ProtectedRoute isLoggedIn={isLoggedIn}>
                                    <CryptoExchange />
                                </ProtectedRoute>
                                }
                            </React.Suspense>
                        } />
                        <Route path="/transfer" element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <TransferData />
                            </ProtectedRoute>
                        } />
                    </Routes>
                    <ToastContainer style={toastContainerStyle} toastStyle={toastMessageStyle} />
                </UserDataContext>
            </loggedInContext.Provider>
        </Provider>
    </div>
  );
}

export default App;
