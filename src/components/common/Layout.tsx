import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <main className='mx-auto md:p-3 bg-base-200'>
            <Navbar />
            <p className='prose'>holaa</p>
            {children}
        </main>
        <Footer />
        
    </>
  )
}

export default Layout