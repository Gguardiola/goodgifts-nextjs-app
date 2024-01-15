import { APIResponse } from '@/models/apiResponse';
import { User } from '@/models/user';
import { fetchUserIdFromEmail, fetchUserProfile } from '@/pages/api/users';
import { getCookies, setCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'

export const useUserAuthentication = () => {
    const [userEmail, setuserEmail] = useState<User | null>(null);  
    const [userData, setUserData] = useState<User | null>(null);  
    useEffect(() => {    
            const currentCookies = getCookies();
            console.log('currentCookies: ', currentCookies);
            setuserEmail({email: currentCookies.email});
            console.log('userEmail: ', userEmail);
        
    }, [])

    useEffect(() => {   
        console.log('userEmail: ', userEmail);
        const handleuserEmail = async () => {
            try {
                if(userEmail != null){
                    const data: APIResponse = await fetchUserIdFromEmail(userEmail);
                    console.log('API response:', data.userId);
                    setCookie('userId', data.userId)
                    const userProfileData: APIResponse = await fetchUserProfile({id: data.userId});
                    console.log('API response:', userProfileData.userProfile);
                    setCookie('userProfile', userProfileData.userProfile)
                    
                    if(userProfileData.userProfile != null){
                        setUserData(userProfileData.userProfile);
                    }
                }

            } catch (error) {
                const errorResponse = await (error as Error).message;
                console.error('API error:', (error as Error).message);       
            }
        }

        if (userEmail != null)handleuserEmail()
    },[userEmail])

    return {userEmail, userData}
}