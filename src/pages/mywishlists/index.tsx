import React, { use, useEffect, useState } from 'react'
import { getCookies, setCookie, deleteCookie, getCookie} from 'cookies-next';
import { useUserAuthentication } from '@/hooks/authUtils';
import Layout from '@/components/common/Layout';
import MyWishlistsMenu from '@/components/mywishlists/MyWishlistsMenu';
import ItemManipulationForm from '@/components/items/ItemManipulationForm';
import MyWishlistsItemMenu from '@/components/mywishlists/MyWishlistsItemMenu';
import { Wishlist } from '@/models/wishlists';
import { Item } from '@/models/items';

function MyWishlistsPage() {

    const [currentWishlist, setCurrentWishlist] = useState<Wishlist | null>(null)
    const [currentItem, setCurrentItem] = useState<Item | null>(null)
    const [triggerWishlistChange, setTriggerWishlistChange] = useState(false)

    return (
        <Layout>
        <section className='pt-3'>
            <div className="divider"><h2 className='prose prose-lg font-bold md:mb-1'>My wishlists</h2></div>
            <div className='lg:flex gap-3'>
                <MyWishlistsMenu currentWishlist={currentWishlist || null} 
                    setCurrentWishlist={setCurrentWishlist} 
                    triggerWishlistChange={triggerWishlistChange}
                    setTriggerWishlistChange={setTriggerWishlistChange}
                />
                <MyWishlistsItemMenu currentWishlist={currentWishlist || null} setTriggerWishlistChange={setTriggerWishlistChange}/>
                {
               
                        <ItemManipulationForm />             
                    
                }
            </div>
            </section>
        </Layout>
    )
}

export default MyWishlistsPage