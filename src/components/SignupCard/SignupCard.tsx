import { signupBody } from '../../models/user';
import React, { useState } from 'react'
import config from '../../../config'

function SignupCard({setToggleForm} : {setToggleForm: any}) {

    const [formData, setFormData] = useState<signupBody>({
        email: '',
        password: '',
        username: '',
        lastname: '',
        birthday: '',
    });    
    const handleFormChanges = (e: any) => {
        e.preventDefault();
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    const handleFormSubmit = (e: any) => {
        handleFormChanges(e);
        fetchSignup();
    };

    const fetchSignup = async () => {
        const res = await fetch(`${config.API_ENDPOINT}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                username: formData.username,
                lastname: formData.lastname,
                birthday: formData.birthday,
            })
        }).then(async res => {
            if (!res.ok) {
                const { message } = await res.json()
                console.log(message)
                throw new Error(message)
            }
        }).catch(err => {
            console.log(err)
        })

        return res;
    }
          
    const handleToggle = () => {setToggleForm(true)}

    return (
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={async (e) => handleFormSubmit(e)} className="card-body prose">
                <h1>Create account</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input name='email' onChange={(e) => handleFormChanges(e)} type="email" placeholder="Email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">First name</span>
                    </label>
                    <input name="username" onChange={(e) => handleFormChanges(e)} type="text" placeholder="First name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Last name</span>
                    </label>
                    <input name="lastname" onChange={(e) => handleFormChanges(e)} type="text" placeholder="Last name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Birthday</span>
                    </label>
                    <input name="birthday" onChange={(e) => handleFormChanges(e)} type="date" placeholder="YYYY-MM-DD" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input name="password" onChange={(e) => handleFormChanges(e)} type="password" placeholder="Password" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button type='submit' className="btn btn-primary">Sign up</button>
                </div>
                <div className='form-control mt-6 m-auto'>
                    <button type='button' onClick={handleToggle} className="btn btn-circle btn-outline">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </form>        
        </div>
    )
}

export default SignupCard
