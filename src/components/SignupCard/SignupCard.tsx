import { SignupBody } from '../../models/user';
import { APIResponse } from '../../models/apiResponse';
import React, { useRef, useState, RefObject } from 'react'
import { fetchSignup } from '@/pages/api/auth';
import SignupModal from './SignupModal';

function SignupCard({setToggleForm} : {setToggleForm: any}) {
    const [currentModalState, setCurrentModalState] = useState(false);
    const [formData, setFormData] = useState<SignupBody>({
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
    const handleFormSubmit = async (e: React.FormEvent) => {
        handleFormChanges(e);

        try {
            const data: APIResponse = await fetchSignup(formData);
            console.log('API response:', data.message);
            if(currentModalState === false){
                console.log('currentModalState is false')
                setCurrentModalState(true);
            }

        } catch (error) {
            console.error('API error:', error);
        }
    };
     
    const handleToggle = () => {setToggleForm(true)}

    return (
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <SignupModal currentModalState={currentModalState}/>
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
                        <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#00991" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </form>        
        </div>
    )
}

export default SignupCard
