import React, { use, useEffect, useState } from 'react'
import { getCookies, setCookie, deleteCookie, getCookie} from 'cookies-next';
import { useUserAuthentication } from '@/hooks/authUtils';
import Layout from '@/components/common/Layout';

function FeedPage() {

    const {userEmail, userData} = useUserAuthentication();
    



    return (
        <Layout>
            <div>
                <h1>Feed Page</h1>
                <p className='prose'>userEmail: {userData?.email}</p>
            </div>
        </Layout>
    )
}

export default FeedPage