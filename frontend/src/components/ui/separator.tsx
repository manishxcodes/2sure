import React from 'react';

interface SeparatorProps {
    label: string
}

export const Separator:React.FC<SeparatorProps> = ({label}) => {
    return (
        <div className='flex items-center px-6'>
            <div className='border-t border-gray-300 flex-grow'></div>
            <div className='text-gray-500 text-sm mx-2'>{label}</div>
            <div className='border-t border-gray-300 flex-grow'></div>
        </div>
    )
}
