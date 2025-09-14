import { useSession } from '@/context/session-context';
import { Loader } from 'lucide-react';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes: React.FC = () => {
    const { isLoggedIn, loading } = useSession(); 
    if(loading) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <Loader className='animate-spin' />
        </div>
    }
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;