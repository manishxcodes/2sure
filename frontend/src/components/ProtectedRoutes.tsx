import { useSession } from '@/context/session-context';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes: React.FC = () => {
    const { isLoggedIn } = useSession(); 

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;