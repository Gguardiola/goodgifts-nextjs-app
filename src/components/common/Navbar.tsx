import React from 'react'
import ThemeController from './ThemeController'
import Link from 'next/link'

function Navbar() {
  return (

    <div className="navbar bg-base-100 shadow-xl rounded-lg md:justify-around">

        <div className="navbar-start rounded-lg">
            <div className="dropdown prose">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content shadow-lg -mt-12 z-[1] p-2 bg-base-100 rounded-box w-52">
                <li><Link className='no-underline p-3 m-0' href="/friends">Friends</Link></li>
                <li><Link className='no-underline p-3 m-0' href="/gifts">Gifts</Link></li>
                <li><Link className='no-underline p-3 m-0' href="/mywishlists">My wishlists</Link></li>
            </ul>
            </div>
            <div className="md:flex md:pl-10 prose">
                <Link className="no-underline" href="feed">
                    <h1 className="p1 mt-auto mb-auto text-2xl">GoodGifts</h1>
                    </Link>
            </div>
        </div>

        <div className="navbar-center hidden lg:flex ">
            <ul className="menu menu-horizontal px-1">
                <li><Link className='no-underline prose prose-md font-bold' href="/friends">Friends</Link></li>
                <li><Link className='no-underline prose prose-md font-bold' href="/gifts">Gifts</Link></li>
                <li><Link className='no-underline prose prose-md font-bold' href="/mywishlists">My wishlists</Link></li>
            </ul>
        </div>

        <div className='flex navbar-end gap-10'>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <ul tabIndex={0} className="prose z-[1] -mt-12 p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li><Link className='no-underline p-3' href="/profle">Profile</Link></li>
                    <li><Link className='no-underline p-3 text-red-500' href="/login">Logout</Link></li>
                </ul>

            </div>
            <div className="md:pr-10 hidden md:flex prose mt-auto mb-auto">
                <ThemeController />
            </div> 
        </div> 
    </div>

  )
}

export default Navbar