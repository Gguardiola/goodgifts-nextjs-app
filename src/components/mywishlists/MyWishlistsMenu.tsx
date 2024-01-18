import { APIResponse } from '@/models/apiResponse';
import { Wishlist } from '@/models/wishlists';
import { fetchUserWishlists, createNewWishlist } from '@/pages/api/wishlists';
import React, { use, useEffect, useRef, useState } from 'react'
import AlertPrompt from '../common/AlertPrompt';


function MyWishlistsMenu({currentWishlist, setCurrentWishlist, triggerWishlistChange, setTriggerWishlistChange, setEditTabClosed} : 
  {currentWishlist: Wishlist | null, setCurrentWishlist: any, triggerWishlistChange: boolean, setTriggerWishlistChange: any, setEditTabClosed: any}) {

  const [isLoading, setIsLoading] = useState(true)
  const [APIResponseMessage, setAPIResponseMessage] = useState({success: false, message: '', date: new Date()})
  const [userWishlists, setUserWishlists] = useState<Wishlist[]>([])
  const [newWishlistName, setNewWishlistName] = useState<string>('')
  const [firstRender, setFirstRender] = useState(true)
  useEffect(() => {
    retrieveUserWishlists()
    //setCurrentWishlist(userWishlists[0]);
    setTriggerWishlistChange(false);
  }, [newWishlistName, triggerWishlistChange])

  useEffect(() => { 
      setCurrentWishlist(userWishlists[0]);
  }, [firstRender])

  useEffect(() => {
    //CALL A RERENDER FOR ALERT PROMPT
  }, [APIResponseMessage])


  //API CALLS
  const retrieveUserWishlists = async () => {
    try {
        //TODO: handle pagination
        const data: APIResponse = await fetchUserWishlists(30,0);
        console.log('API response:', data.wishlists);
        if(data.wishlists != null){
          setUserWishlists(data.wishlists);
          setIsLoading(false);
          setFirstRender(false);
        }
        

    } catch (error) {
        const errorResponse = await (error as Error).message;
        console.error('API error:', (error as Error).message);       
        if(errorResponse != null){setAPIResponseMessage({success: false, message: (error as Error).message, date: new Date()})} 
    }
  };

  const confirmCreateNewWishlist = async (newWishlistName: string) => {
    try {
        
        const data: APIResponse = await createNewWishlist(newWishlistName);
        console.log('API response:', data.message);
        if(data.message != null){setAPIResponseMessage({success: true, message: data.message, date: new Date()})}
        //TODO: select the new wishlist
        retrieveUserWishlists();
        

    } catch (error) {
        const errorResponse = await (error as Error).message;
        console.error('API error:', (error as Error).message);      
        if(errorResponse != null){setAPIResponseMessage({success: false, message: (error as Error).message, date: new Date()})} 
    }
  };

  //WISHLSIT HANDLING
  const handleWishlistCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    confirmCreateNewWishlist(newWishlistName);
    handleCloseCreateWishlistModal(); 
  }

  const handleCurrentWishlistSelection = (wishlistName: string) => {

    for (let i = 0; i < userWishlists.length; i++) {
      if(userWishlists[i].wishlist_name == wishlistName){
        setCurrentWishlist(userWishlists[i]);
        setEditTabClosed(false);
        break;
      }
    }
  }

  //FORM AND MODAL HANDLING
  const handleFormChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setNewWishlistName((e.target as HTMLInputElement).value);
  }
  const handleOpenCreateWishlistModal = () => {
    const modal = document.getElementById('createNewWishlistModal') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  const handleCloseCreateWishlistModal = () => {  
    const modal = document.getElementById('createNewWishlistModal') as HTMLDialogElement;
    const newWishlistNameInput = document.getElementById('newWishlistName_input') as HTMLInputElement;
    newWishlistNameInput.value = '';
    modal.close()
  }

  return (
    <div className="mt-5 lg:mt-0 md:flex-none bg-base-100 lg:w-64 p-1 pb-3 pr-3 rounded-box">
        <div className='flex pr-5 pl-5'>
            <button className='grow mt-5 btn btn-primary' onClick={() => handleOpenCreateWishlistModal()}>Create new</button>
        </div>
        <div className='divider pr-5 pl-5'></div>
        <div className='h-96 lg:h-[570px] overflow-y-scroll overflow-x-hidden'>
            <ul className="menu w-auto">
                {isLoading ? (
                  <li>
                    <span className="mx-auto loading loading-dots loading-xs prose max-w-none"></span>
                  </li>
                ) : (
                  userWishlists.map((wishlist) => (
                    <li key={wishlist.id}>
                      <button onClick={() => handleCurrentWishlistSelection(wishlist.wishlist_name)} className={currentWishlist?.wishlist_name == wishlist.wishlist_name ? 
                        `no-underline p-3 m-0 prose max-w-none font-bold ring-2` : `no-underline p-3 m-0 prose max-w-none`}>
                        {wishlist.wishlist_name}
                      </button>
                    </li>
                  ))
                )}
            </ul>
        </div>
        {/* NEW WISHLIST MODAL */}
        <dialog id="createNewWishlistModal" className="modal prose max-w-none">
          <div className="modal-box">
            <form method="dialog">
              <button onClick={handleCloseCreateWishlistModal} className="btn btn-sm btn-circle absolute right-2 top-2 prose">✕</button>
            </form>
            <div className='mx-auto'>
              <form onSubmit={async (e) => handleWishlistCreation(e)}>
                <div className='form-control'>
                  <h3 className="font-bold text-lg">Wishlist name</h3>
                  <input id="newWishlistName_input" minLength={5} maxLength={50} name="newWishlistName" type="text" placeholder="My wishlist" onChange={(e) => handleFormChanges(e)} className="input input-bordered w-full prose max-w-none" required/>
                </div>
                <div className='form-control'>
                  <button className="btn btn-primary mt-6" type='submit'>Create</button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
        
        <AlertPrompt currentMessage={APIResponseMessage.message || ''} date={APIResponseMessage.date} success={APIResponseMessage.success} />

    </div> 
  )
}

export default MyWishlistsMenu