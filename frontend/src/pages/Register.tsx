import { RegisterForm } from '@/components/RegisterForm'
import React from 'react'

export const Register: React.FC = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
        <RegisterForm />
    </div>
  )
}