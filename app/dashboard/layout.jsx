import { UserButton } from '@clerk/nextjs'
import Header from './_components/Header'
import React from 'react'
import { Toaster } from '@/components/ui/sonner'

function DashboardLayout({children}) {
  return (
    <div>
      <Header/>
    
      <div className='mx-5 md:mx-20 lg:mx-36'>
        <Toaster />
        {children}

      </div>
    </div>
  )
}

export default DashboardLayout