import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'

export default function RootLayout() {
  return (
    <>

        <Header />

        <main className='p-5'>

        <Outlet />
        </main>
        
    </>
  )
}
