import React, { use, useEffect, useState } from 'react'
import Layout from '@/components/common/Layout';
import ProfileCard from '@/components/users/ProfileCard';
import { useRouter } from 'next/router';

function ProfilePage() {
    const [triggerProfileChange, setTriggerProfileChange] = useState(false)
    const router = useRouter();
    useEffect(() => {
        if(triggerProfileChange){
            console.log("profile changed")
            setTriggerProfileChange(false);
            router.reload();
        }
    },[triggerProfileChange]);
    return (
        <Layout>
        <section className='pt-3'>
            <div className="divider"><h2 className='prose prose-lg font-bold md:mb-1'>My profile</h2></div>
            <div className='lg:flex gap-3'>
                <ProfileCard setTriggerProfileChange={setTriggerProfileChange} />
            </div>
            </section>
        </Layout>
    )
}

export default ProfilePage