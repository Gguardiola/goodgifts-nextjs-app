import React, { useEffect, useState } from 'react'
import ItemCard from '../items/ItemCard'
import { Wishlist } from '@/models/wishlists'
import { format } from 'date-fns';
import { APIResponse } from '@/models/apiResponse';
import { Item } from '@/models/items';
import { fetchWishlistItems, deleteWishlist } from '@/pages/api/wishlists';
import AlertPrompt from '../common/AlertPrompt';
import AddNewItemModal from '../items/AddNewItemModal';

function MyWishlistsItemMenu({currentWishlist, setTriggerWishlistChange} : {currentWishlist: Wishlist | null, setTriggerWishlistChange: any}) {

    const [isLoading, setIsLoading] = useState(true)
    const [APIResponseMessage, setAPIResponseMessage] = useState({success: false, message: '', date: new Date()})
    const [wishlistItems, setWishlistItems] = useState<Item[]>([])
    const creationDate = new Date(currentWishlist?.created_at || new Date());

    useEffect(() => {
        retrieveWishlistItems(currentWishlist?.wishlist_name || 'My wishlist')
      }, [currentWishlist])
      
    useEffect(() => {
        //CALL A RERENDER FOR ALERT PROMPT
      }, [APIResponseMessage])

    //API CALLS
    const retrieveWishlistItems = async (wishlistName: string) => {
        try {
            //TODO: handle pagination
            const data: APIResponse = await fetchWishlistItems(wishlistName);
            console.log('API response:', data.items);
            if(data.items != null){
              setWishlistItems(data.items);
              setIsLoading(false);
            }
            
    
        } catch (error) {
            const errorResponse = await (error as Error).message;
            console.error('API error:', (error as Error).message);       
            if(errorResponse != null){setAPIResponseMessage({success: false, message: (error as Error).message, date: new Date()})} 
        }
    }; 

    const ConfirmDeleteWishlist = async (wishlistName: string) => {
        try {
            //TODO: handle pagination
            if(wishlistName != "undefined"){
                const data: APIResponse = await deleteWishlist(wishlistName);
                console.log('API response:', data.message);
                if(data.message != null){setAPIResponseMessage({success: true, message: data.message, date: new Date()})} 
                setTriggerWishlistChange(true);
            }
    
        } catch (error) {
            const errorResponse = await (error as Error).message;
            console.error('API error:', (error as Error).message);       
            if(errorResponse != null){setAPIResponseMessage({success: false, message: (error as Error).message, date: new Date()})} 
        }
    }; 


    // DELETE WISHLIST HANDLERS
    const handleOpenDeleteWishlistModal = () => {
        const modal = document.getElementById('deleteWishlistModal') as HTMLDialogElement;
            if (modal) {
                modal.showModal();
            }
    }

    const handleOpenNewItemModal = () => {
        const modal = document.getElementById('addNewItemModal') as HTMLDialogElement;
            if (modal) {
                modal.showModal();
            }
    }
    
    const handleCloseDeleteWishlistModal = () => {  
        const modal = document.getElementById('deleteWishlistModal') as HTMLDialogElement;
        modal.close()
    }

    const handleDeleteWishlistConfirmation = () => {
        ConfirmDeleteWishlist(currentWishlist?.wishlist_name || "undefined");
        handleCloseDeleteWishlistModal()
    }


  return (
        <div className="mt-5 lg:mt-0 bg-base-100 p-1 pb-3 pr-3 grow rounded-box">
            <div className='md:flex justify-between'>
                <div className='pr-5 pl-5 pt-5'>
                    <div className='flex gap-3'>
                        <h2 className='prose text-2xl font-bold'>{currentWishlist?.wishlist_name || "My wishlist"}</h2>

                        {currentWishlist?.wishlist_name != 'My wishlist' && 
                            (
                            <button className='prose'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 opacity-50 hover:opacity-80">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
                            </button>
                            )
                        }

                    </div>
                    <p className='prose prose-base opacity-80'>Created on {format(creationDate,"yyyy-MM-dd")}</p>

                </div>
                <div className='pr-5 pl-5 pt-5'>
                    <button onClick={handleOpenNewItemModal} className='btn btn-outline mb-5 mr-3 md:mr-3'>Add item</button>
                    {
                        currentWishlist?.wishlist_name != 'My wishlist' ? 
                        (
                            <button onClick={() => handleOpenDeleteWishlistModal()} className='btn btn-outline btn-error'>Delete wishlist</button>
                        ) :
                        (
                            <div className="tooltip tooltip-bottom" data-tip="You cannot delete the default wishlist!">
                                <button className='btn btn-outline btn-error' disabled>Delete wishlist</button>
                            </div>
                        )
                    }
                    
                </div>
            </div>
            <div className='divider pr-5 pl-5'></div>
            <div className='h-[550px]  overflow-y-auto'>
                <div className="w-auto">
                {                 
                    isLoading && (
                        <div className='container flex justify-center h-96'>
                            <span className="loading loading-dots loading-md prose max-w-none"></span>
                        </div>
                    )
                }

                {
                    (!isLoading && wishlistItems.length == 0) && (
                        <div className='container flex justify-center h-96'>
                            <span className="prose max-w-none">No items found!</span>
                        </div>
                    )
                }

                {
                    (!isLoading && wishlistItems.length > 0) && (
                        <ul className="menu w-auto">
                            {
                                wishlistItems.map((item) => (
                                    <li key={item.id}>
                                        <ItemCard item={item} />
                                    </li>
                                ))
                            }
                        </ul>
                    )   
                }
                </div>
            </div>

            <AlertPrompt currentMessage={APIResponseMessage.message || ''} date={APIResponseMessage.date} success={APIResponseMessage.success} />
            <AddNewItemModal wishlistName={currentWishlist?.wishlist_name || ''} setTriggerWishlistChange={setTriggerWishlistChange} />
            <dialog id="deleteWishlistModal" className="modal prose max-w-none">
          <div className="modal-box">
            <div className='mx-auto'>
                <h3 className='flex justify-center'>Delete '{currentWishlist?.wishlist_name}'?</h3>
                <div className='md:flex md:justify-center md:gap-5'>
                    <div className='form-control'>
                    <button onClick={handleCloseDeleteWishlistModal} className="btn btn-outline mt-6">Go back</button>
                    </div>
                    <div className='form-control'>
                    <button onClick={handleDeleteWishlistConfirmation} className="btn btn-error mt-6">Delete</button>
                    </div>
                </div>
            </div>
          </div>
        </dialog>
        </div>
  )
}

export default MyWishlistsItemMenu