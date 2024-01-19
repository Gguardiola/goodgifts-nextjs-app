import React, { useState } from 'react'
import Image from 'next/image'
import LoginCard from '../../components/LoginCard/LoginCard'
import SignupCard from '../../components/SignupCard/SignupCard'
import Footer from '@/components/common/Footer';

const LoginPage = () => {
    const [toggleForm, setToggleForm] = useState(true);
    return (
    <>
        <div className="hero min-h-screen bg-base-200 ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left lg:m-10 prose">
                    <h1 className="text-5xl">GoodGifts</h1>
                    <div className='hidden lg:block'>
                        <Image 
                        //retrieve image from public folder
                            src={'/loginimage.png'}
                            width={300}
                            height={300}
                            alt={'gifts'}
                        />
                    </div>
                    <p className="py-6 prose-lg font-bold">Improve Your Gift-Giving Experience!</p>

                </div>
                    {toggleForm ? <LoginCard setToggleForm={setToggleForm} /> : <SignupCard setToggleForm={setToggleForm} />}              
            </div>
        </div>
        <Footer />
        </>
    )
}

export default LoginPage