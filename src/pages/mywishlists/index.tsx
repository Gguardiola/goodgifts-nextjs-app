import React, { use, useEffect, useState } from 'react'
import { getCookies, setCookie, deleteCookie, getCookie} from 'cookies-next';
import { useUserAuthentication } from '@/hooks/authUtils';
import Layout from '@/components/common/Layout';

function MyWishlistsPage() {

    const {userEmail, userData} = useUserAuthentication();
    



    return (
        <Layout>
        <section className='pt-3'>
            <div className="divider"><h2 className='prose prose-lg font-bold md:mb-1'>My wishlists</h2></div>
            <div className='md:flex gap-3'>
                <div className="md:flex-none bg-base-100 md:w-64 p-1 pb-3 pr-3 rounded-box">
                    <div className='flex pr-5 pl-5'>
                        <button className='grow mt-5 btn btn-primary'>Create new</button>
                    </div>
                    <div className='divider pr-5 pl-5'></div>
                    <div className='h-[570px] overflow-y-auto'>
                        <ul className="menu w-auto prose">
                            <li><a className='no-underline p-3 m-0'>Item 1</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 2</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 3</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 1</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 2</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 3</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 1</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 2</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 3</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 1</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 2</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 3</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 1</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 2</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 3</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 1</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 2</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 3</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 1</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 2</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 3</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 1</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 2</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 3</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 1</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 2</a></li>
                            <li><a className='no-underline p-3 m-0'>Item 3</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 bg-base-100 p-1 pb-3 pr-3 grow rounded-box">
                    <div className='md:flex justify-between'>
                        <div className='pr-5 pl-5 pt-5'>
                            <div className='flex gap-3'>
                                <h2 className='prose text-2xl font-bold'>Birthday best gifts</h2>
                                <button className='prose'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 opacity-50 hover:opacity-80">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
                                </button>
                            </div>
                            <p className='prose prose-base opacity-80'>Created at: 10-10-1999</p>

                        </div>
                        <div className='pr-5 pl-5 pt-5'>
                            <button className='btn btn-outline mb-5 mr-3 md:mr-3'>Add item</button>
                            <button className='btn btn-outline btn-error'>Delete wishlist</button>
                        </div>
                    </div>
                    <div className='divider pr-5 pl-5'></div>
                    <div className='overflow-y-scroll'>
                        <div className="w-auto">
                        <div className="pl-2 m-3 card lg:card-side bg-base-100 shadow-xl">
                                <figure><img className="mask mask-squircle" src="https://daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title prose prose-xl">Pata de jamón ibérico 5J D.O</h2>
                                    <p className='prose prose-base'>Para mi cumpleaños, lo mejor.</p>
                                    <p className='prose prose-base'><a className="btn-link" href="www.google.com" target='_blank'>Purchase link</a></p>
                                    <p className='prose prose-base italic'>Item added on 10-10-1999</p>
                                    <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Edit</button>
                                    <button className="btn btn-error">Delete Item</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 bg-base-100 p-1 pb-3 pr-3 grow rounded-box">
                    <div className='md:flex justify-between'>
                        <div className='pr-5 pl-5 pt-5'>
                            <div className='flex gap-3'>
                                <h2 className='prose text-2xl font-bold'>Add/Edit Item</h2>
                            </div>
                            <p className='prose prose-base opacity-80'>Item added on 10-10-1999</p>

                        </div>
                        <div className='pr-5 pl-5 pt-5'>
                            <button className='btn btn-outline btn-error'>Delete</button>
                        </div>
                    </div>
                    <div className='divider pr-5 pl-5'></div>
                    <div className='overflow-y-auto'>
                        <form className="card-body prose">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input name='item_name' defaultValue="Pata de jamón ibérico 5J D.O" type="text" placeholder="Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <input name="item_description" defaultValue="Para mi cumpleaños, lo mejor." type="text" placeholder="Description" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">URL (optional)</span>
                                </label>
                                <input name="item_url" type="text" placeholder="https://www.example.com" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image (optional)</span>
                                </label>
                                <input type="file" placeholder="You can't touch this" className="file-input file-input-bordered w-full max-w-xs" disabled />
                            </div>                            
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Confirm</button>
                            </div>
                            <div className='form-control mt-6 m-auto'>
                                <button type='button' className="btn btn-circle btn-outline">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#00991" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </form>  
                    </div>
                </div>                
            </div>
            </section>
        </Layout>
    )
}

export default MyWishlistsPage