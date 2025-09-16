import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { CrossIcon } from 'lucide-react';
import React from 'react'

const Error: React.FC = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <Card className='flex items-center justify-around max-w-sm w-full '>
          <CardContent>
            <CrossIcon />
            <CardTitle>Something went wrong</CardTitle>
          </CardContent>
      </Card>
    </div>
  )
}

export default Error;