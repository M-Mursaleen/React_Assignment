import React, { useContext } from 'react';
import {Routes, Route, Navigate } from 'react-router-dom';
import LoggedInContext from './Context/loggedInContext';

const ProtectedRoute = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return children;
};
export default ProtectedRoute;