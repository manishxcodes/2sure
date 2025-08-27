import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes: React.FC = () => {
    const isLoggedIn = false;

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes