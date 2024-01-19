import { APIResponse } from '@/models/apiResponse';
import { Item } from '@/models/items'
import { deleteCurrentItem, editCurrentItem } from '@/pages/api/items';
import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react'
import AlertPrompt from '../common/AlertPrompt';

function ItemManipulationForm({currentItem, editTabClosed, setEditTabClosed, triggerWishlistChange, setTriggerWishlistChange} :
    {currentItem: Item | null, editTabClosed: boolean, setEditTabClosed: any, triggerWishlistChange: boolean, setTriggerWishlistChange: any}) {

        
    const creationDate = new Date(currentItem?.created_at || new Date());
    const formRef = useRef(document.getElementById('itemEditform') as HTMLFormElement);
    const [formData, setFormData] = useState<Item>({
        item_name: currentItem?.item_name || "",
        item_description: currentItem?.item_description || "",
        item_url: currentItem?.item_url || "",
        image_name: currentItem?.image_name || "",
    }); 
    
    const [APIResponseMessage, setAPIResponseMessage] = useState({success: false, message: '', date: new Date()})

    useEffect(() => {
        //CALL A RERENDER FOR ALERT PROMPT
    }, [APIResponseMessage])
    
    useEffect(() => {
        setFormData({
            item_name: currentItem?.item_name || "",
            item_description: currentItem?.item_description || "",
            item_url: currentItem?.item_url || "",
            image_name: currentItem?.image_name || "",
        })   
        //CALL A RERENDER WHEN CURRENT ITEM CHANGES
    }, [currentItem])
    
    //DELETE HANDLERS
    const handleDeleteItem = async () => {    
        try {
            if(currentItem?.id != null){
                const data: APIResponse = await deleteCurrentItem(formData.item_name);
                console.log('API response:', data.message);
                if(data.message != null){setAPIResponseMessage({success: true, message: data.message, date: new Date()})}
                handleCloseDeleteItemModal();
                setTriggerWishlistChange(true);
                setTimeout(() => { 
                    handleCloseEditTab()
                }, 2000);
            }
        } catch (error) {
            const errorResponse = await (error as Error).message;
            console.error('API error:', (error as Error).message);     
            if(errorResponse != null){setAPIResponseMessage({success: false, message: (error as Error).message, date: new Date()})}   
        }
    
    }

    const handleCloseDeleteItemModal = () => {  
        const modal = document.getElementById('deleteItemModal') as HTMLDialogElement;
        modal.close()
    }

    const handleOpenDeleteItemtModal = () => {
        const modal = document.getElementById('deleteItemModal') as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    }

    //FORM HANDLERS
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
            if(currentItem?.id != null){
                const data: APIResponse = await editCurrentItem(currentItem?.id, formData);
                console.log('API response:', data.message);
                setTriggerWishlistChange(true);
                if(data.message != null){setAPIResponseMessage({success: true, message: data.message, date: new Date()})} 
            }
        } catch (error) {
            const errorResponse = await (error as Error).message;
            console.error('API error:', (error as Error).message);    
            if(errorResponse != null){setAPIResponseMessage({success: false, message: (error as Error).message, date: new Date()})}    

        }
    }; 

    const handleCloseEditTab = () => {
        setEditTabClosed(false);
    }   

  return (
    <>
        <AlertPrompt currentMessage={APIResponseMessage.message || ''} date={APIResponseMessage.date} success={APIResponseMessage.success} />
        <div className="mt-5 lg:mt-0  bg-base-100 p-1 pb-3 pr-3 grow rounded-box">
            <div className='md:flex justify-between'>
                <div className='pr-5 pl-5 pt-5'>
                    <div className='flex gap-3'>
                        <h2 className='prose text-2xl font-bold'>Edit Item</h2>
                    </div>
                    <p className='prose prose-base opacity-80'>Item added on {format(creationDate,"yyyy-MM-dd")}</p>

                </div>
                <div className='pr-5 pl-5 pt-5'>
                    <button onClick={handleOpenDeleteItemtModal} className='btn btn-outline btn-error'>Delete</button>
                </div>
            </div>
            <div className='divider pr-5 pl-5'></div>
            <div className='overflow-y-auto'>
                <form id="itemEditform" onSubmit={(e) => handleFormSubmit(e)} className="card-body prose max-w-none">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input name='item_name' minLength={5} onChange={(e) => handleFormChanges(e)} value={formData?.item_name} type="text" placeholder="Name" className="input input-bordered" required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input name="item_description" minLength={5} onChange={(e) => handleFormChanges(e)} value={formData?.item_description} type="text" placeholder="Description" className="input input-bordered" required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">URL (optional)</span>
                        </label>
                        <input name="item_url" onChange={(e) => handleFormChanges(e)} value={formData?.item_url} type="text" placeholder="https://www.example.com" className="input input-bordered" />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image (optional)</span>
                        </label>
                        {/* TODO: IMAGE UPLOAD */}
                        <input type="file" onChange={(e) => handleFormChanges(e)} placeholder="You can't touch this" className="file-input file-input-bordered w-full max-w-xs" disabled />
                    </div>                            
                    <div className="form-control mt-6">
                        <button type='submit' className="btn btn-primary">Update item</button>
                    </div>
                    <div className='form-control mt-6 m-auto'>
                        <button onClick={handleCloseEditTab} type='button' className="btn btn-circle btn-outline">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#00991" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </form>  
            </div>
            <dialog id="deleteItemModal" className="modal prose max-w-none">
                    <div className="modal-box">
                        <div className='mx-auto'>
                            <h3 className='flex justify-center'>Delete &quot;{formData?.item_name}&quot;?</h3>
                            <div className=''>
                                <div className='form-control'>
                                    <button onClick={handleDeleteItem} className="btn btn-error mt-6">Delete</button>
                                </div>
                                <div className='form-control'>
                                    <button onClick={handleCloseDeleteItemModal} className="btn btn-outline mt-6">Go back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </dialog>
        </div> 
    </> 
  )
}

export default ItemManipulationForm