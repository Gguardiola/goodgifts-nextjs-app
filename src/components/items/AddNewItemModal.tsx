import { APIResponse } from '@/models/apiResponse';
import { Item } from '@/models/items';
import { addNewItem, addToWishlist, fetchUserItem } from '@/pages/api/items';
import React, { useEffect, useState } from 'react'
import AlertPrompt from '../common/AlertPrompt';

function AddNewItemModal({wishlistName, setTriggerWishlistChange} : {wishlistName: string, setTriggerWishlistChange: any}) {

    const [APIResponseMessage, setAPIResponseMessage] = useState({success: false, message: '', date: new Date()})

    useEffect(() => {
        //CALL A RERENDER FOR ALERT PROMPT
    }, [APIResponseMessage])

    const [formData, setFormData] = useState<Item>({
        item_name: "",
        item_description: "",
        item_url: "",
        image_name: "",
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
            const data: APIResponse = await addNewItem(formData);
            console.log('API response:', data.message);
            const data_item: APIResponse = await fetchUserItem(formData.item_name);
            console.log('API response:', data_item.item?.id);
            if(data_item.item?.id != null){
                const data_itemToWishlist: APIResponse = await addToWishlist(data_item.item?.id, wishlistName);
                console.log('API response:', data_itemToWishlist.message);
                setTriggerWishlistChange(true);
                const form = e.target as HTMLFormElement;
                for (const element of form.elements as any) {
                    element.value = '';
                }
                handleCloseModal()
                if(data.message != null){setAPIResponseMessage({success: true, message: data.message, date: new Date()})} 
    
            }

        } catch (error) {
            const errorResponse = await (error as Error).message;
            console.error('API error:', (error as Error).message);      
            if(errorResponse != null){setAPIResponseMessage({success: false, message: (error as Error).message, date: new Date()})} 
        }
    };    
    
    
    const handleCloseModal = () => {
        const modal = document.getElementById('addNewItemModal') as HTMLFormElement;
        modal.close();
    }

  return (
    <>
    <AlertPrompt currentMessage={APIResponseMessage.message || ''} date={APIResponseMessage.date} success={APIResponseMessage.success} />
        <dialog id="addNewItemModal" className="modal prose max-w-none">
        <div className="modal-box">
        <form method="dialog">
            <button onClick={handleCloseModal} className="btn btn-sm btn-circle absolute right-2 top-2 prose">✕</button>
        </form>
        <div className='mx-auto'>
            
            <form onSubmit={async (e) => handleFormSubmit(e)} className="card-body prose max-w-none">
            <h2 className="card-title prose prose-xl">Add new item to &quot{wishlistName}&quot</h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input onChange={async (e) => handleFormChanges(e)} name='item_name' type="text" placeholder="Name" className="input input-bordered" required/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input onChange={async (e) => handleFormChanges(e)} name="item_description" type="text" placeholder="Description" className="input input-bordered" required/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">URL (optional)</span>
                    </label>
                    <input  onChange={async (e) => handleFormChanges(e)}name="item_url" type="text" placeholder="https://www.example.com" className="input input-bordered"/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Image (optional)</span>
                    </label>
                    <input onChange={async (e) => handleFormChanges(e)} type="file" placeholder="You can't touch this" className="file-input file-input-bordered w-full max-w-xs" disabled />
                </div>                            
                <div className="form-control mt-6">
                    <button type='submit' className="btn btn-primary">Create item</button>
                </div>
                <div className="form-control mt-6">
                    <button onClick={handleCloseModal} type='button' className="btn btn-outline">Cancel</button>
                </div>
            </form>         
        </div>
        </div>
    </dialog>
  </>
  )
}

export default AddNewItemModal