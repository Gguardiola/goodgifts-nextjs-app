import React, { useEffect, useRef, useState } from 'react'
import { User } from '../../models/user';
import { APIResponse } from '@/models/apiResponse';
import { fetchLogin } from '@/pages/api/auth';
import { useRouter } from 'next/router'
import ModalError from '../common/ModalError';
import { setCookie } from 'cookies-next';
import AlertPrompt from '../common/AlertPrompt';

function LoginCard({setToggleForm}: {setToggleForm: any}) {

    const [APIResponseMessage, setAPIResponseMessage] = useState({success: false, message: '', date: new Date()})
    const router = useRouter()
    const [currentModalStateError, setCurrentModalStateError] = useState<boolean>(false);
    const loginError = useRef('');
    const [formData, setFormData] = useState<User>({
        email: '',
        password: '',
    });    
    const handleFormChanges = (e: any) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    useEffect(() => {
        //CALL A RERENDER FOR ALERT PROMPT
      }, [APIResponseMessage])

    useEffect(() => {
        setCurrentModalStateError(false);
      }, [currentModalStateError]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        handleFormChanges(e);

        try {
            const data: APIResponse = await fetchLogin(formData);
            console.log('API response:', data.message);
            setCookie('token', data.token, {
                secure: process.env.NODE_ENV === 'production',
                maxAge: 48 * 60 * 60,
                path: '/',
            });
            setCookie('email', formData.email)
            //TODO: change again to /feed and do the landing page
            router.push('/feed')
            

        } catch (error) {
            const errorResponse = await (error as Error).message;
            console.error('API error:', (error as Error).message);       
            if(errorResponse != null){setAPIResponseMessage({success: false, message: (error as Error).message, date: new Date()})} 
            if(currentModalStateError === false){
                loginError.current = errorResponse;
                setCurrentModalStateError(true);
                  
            }
        }
    };

    const handleToggle = () => {setToggleForm(false)}

    return (
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <AlertPrompt currentMessage={APIResponseMessage.message || ''} date={APIResponseMessage.date} success={APIResponseMessage.success} />
            <form onSubmit={async (e) => handleFormSubmit(e)} className="card-body prose">
                <h1>Login</h1>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" onChange={(e) => handleFormChanges(e)} placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" onChange={(e) => handleFormChanges(e)} placeholder="password" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button type='submit' className="btn btn-primary">Login</button>
                </div>
                <div className="form-control mt-6">
                    <button type='button' onClick={handleToggle} className="btn btn-neutral btn-outline">Create account</button>
                </div>
            </form>        
        </div>
    )
}

export default LoginCard