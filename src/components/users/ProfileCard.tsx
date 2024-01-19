import { useUserAuthentication } from '@/hooks/authUtils';
import { APIResponse } from '@/models/apiResponse';
import { User } from '@/models/user';
import { updateProfile } from '@/pages/api/users';
import { getCookie, getCookies } from 'cookies-next';
import { format, set } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { profile } from 'console';
import AlertPrompt from '../common/AlertPrompt';

function ProfileCard({setTriggerProfileChange}: {setTriggerProfileChange: any}) {
    const {userEmail, userData} = useUserAuthentication();
    const [APIResponseMessage, setAPIResponseMessage] = useState({success: false, message: '', date: new Date()})
    //TODO: solve error that forces to reload 2 times to get the updated profile
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<User>({});
    const [profileCookie, setProfileCookie] = useState(getCookie("userProfile"));
    const creationDate = new Date(userProfile?.created_at || new Date());
    const birthDate = new Date(userProfile?.birthday || new Date());
    const [formData, setFormData] = useState<User>({
        email: '',
        username: '',
        lastname: '',
        birthday: '',
        bioDesc: '',   
        image_name: '',
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
        if(profileCookie){
            const currentProfile: User = JSON.parse(profileCookie);
            setUserProfile(currentProfile);
            console.log('profile cookie:', formData);
        }
    }, [profileCookie]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        handleFormChanges(e);
        console.log('form data:', formData)

        try {
            const data: APIResponse = await updateProfile(formData);
            console.log('API response:', data.message);
            if(data.message != null){setAPIResponseMessage({success: true, message: data.message, date: new Date()})} 
            setTimeout(() => {
                setTriggerProfileChange(true); 
                window.location.reload();
            }, 2000);

        } catch (error) {
            const errorResponse = await (error as Error).message;
            console.error('API error:', (error as Error).message);       
            if(errorResponse != null){setAPIResponseMessage({success: false, message: (error as Error).message, date: new Date()})} 
        }
    };
  return (
    <>
    <AlertPrompt currentMessage={APIResponseMessage.message || ''} date={APIResponseMessage.date} success={APIResponseMessage.success} />
    <div className="mt-5 lg:mt-0 bg-base-100 p-1 pb-3 pr-3 grow rounded-box">
        <div className='container mx-auto lg:flex mt-5 gap-3 lg:m-10 justify-center lg:justify-center'>
            <div className='m-3 my-auto mb-10 lg:mb-0'>
                <div className="avatar flex justify-center">
                    <div className="w-48 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='prose'>
                    <h2 className=''>{userProfile?.username} {userProfile?.lastname}</h2>
                    <blockquote>&quot;{userProfile?.biodesc}&quot;</blockquote>
                    <span>{format(birthDate, "yyyy-MM-dd")}</span>
                    <p>{userProfile?.email}</p> 
                    <p>Created on {format(creationDate,"yyyy-MM-dd")}</p>
                </div>
            </div>
        </div>

        <div className='divider prose max-w-none p-5'></div>
        <div className='container mx-auto prose mt-5 lg:mt-10'>
            <h2 className='prose prose-lg text-2xl font-bold m-5'>Edit profile</h2>
            <div className='flex justify-center'>
                <form onSubmit={async (e) => handleFormSubmit(e)} className='grow'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">First name</span>
                        </label>
                        <input type="text" name="username" onChange={(e) => handleFormChanges(e)} defaultValue={userProfile?.username} placeholder="First name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Last name</span>
                        </label>
                        <input type="text" name="lastname" onChange={(e) => handleFormChanges(e)} defaultValue={userProfile?.lastname} placeholder="Last name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Birthday</span>
                        </label>
                        <input type="date" name="birthday" onChange={(e) => handleFormChanges(e)} defaultValue={format(birthDate, "yyyy-MM-dd")} placeholder="Birthday" className="input input-bordered" />
                    </div>
                    <div className="form-control h-36">
                        <label className="label">
                            <span className="label-text">Bio</span>
                        </label>
                        <textarea placeholder="Bio" name="bioDesc" maxLength={50} onChange={(e) => handleFormChanges(e)} defaultValue={userProfile?.biodesc} className="textarea textarea-bordered h-24"></textarea>
                    </div>
                    {/* <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" onChange={(e) => handleFormChanges(e)} defaultValue={userProfile?.email} placeholder="Email" className="input input-bordered" />
                    </div> */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        {/* TODO: IMAGE UPLOAD */}
                        <input type="file" name="image_name" onChange={(e) => handleFormChanges(e)} placeholder="You can't touch this" className="file-input file-input-bordered w-full max-w-xs" disabled />
                    </div>                            
                    {/* <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="Password" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Confirm password</span>
                        </label>
                        <input type="password" name="newPassword" placeholder="Confirm password" className="input input-bordered" />
                    </div> */}
                    <div className="form-control mt-6">
                        <button type="submit" value="Save" className="btn btn-primary">Save profile settings</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default ProfileCard
