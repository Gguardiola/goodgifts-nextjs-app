import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
        <main className='container mx-auto md:p-3 min-h-screen'>
            <Navbar />
            {children}
        </main>
        {/* <Footer /> */}
        
    </>
  )
}

export default Layout