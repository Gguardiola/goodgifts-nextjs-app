import React, { useState } from 'react'
import LoginCard from '../../components/LoginCard/LoginCard'
import SignupCard from '../../components/SignupCard/SignupCard'

const LoginPage = () => {
    const [toggleForm, setToggleForm] = useState(true);
    console.log(toggleForm);
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                <h1 className="text-5xl prose font-bold">GoodGifts</h1>
                <p className="py-6 prose">Improve Your Gift-Giving Experience!</p>
                </div>
                    {toggleForm ? <LoginCard setToggleForm={setToggleForm} /> : <SignupCard setToggleForm={setToggleForm} />}              
            </div>
        </div>
    )
}

export default LoginPage