import { APIResponse } from '@/models/apiResponse';
import { Item } from '@/models/items'
import { editCurrentItem } from '@/pages/api/items';
import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react'

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
    
    useEffect(() => {
        console.log("to edit",currentItem)
        setFormData({
            item_name: currentItem?.item_name || "",
            item_description: currentItem?.item_description || "",
            item_url: currentItem?.item_url || "",
            image_name: currentItem?.image_name || "",
        })
        
        //CALL A RERENDER WHEN CURRENT ITEM CHANGES
    }, [currentItem])
 

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
            }
        } catch (error) {
            const errorResponse = await (error as Error).message;
            console.error('API error:', (error as Error).message);       

        }
    }; 
    const handleCloseEditTab = () => {
        setEditTabClosed(false);
    }   

  return (
    <div className="mt-5 lg:mt-0  bg-base-100 p-1 pb-3 pr-3 grow rounded-box">
        <div className='md:flex justify-between'>
            <div className='pr-5 pl-5 pt-5'>
                <div className='flex gap-3'>
                    <h2 className='prose text-2xl font-bold'>Edit Item</h2>
                </div>
                <p className='prose prose-base opacity-80'>Item added on {format(creationDate,"yyyy-MM-dd")}</p>

            </div>
            <div className='pr-5 pl-5 pt-5'>
                <button className='btn btn-outline btn-error'>Delete</button>
            </div>
        </div>
        <div className='divider pr-5 pl-5'></div>
        <div className='overflow-y-auto'>
            <form id="itemEditform" onSubmit={(e) => handleFormSubmit(e)} className="card-body prose max-w-none">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input name='item_name' onChange={(e) => handleFormChanges(e)} value={formData?.item_name} type="text" placeholder="Name" className="input input-bordered" required/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input name="item_description" onChange={(e) => handleFormChanges(e)} value={formData?.item_description} type="text" placeholder="Description" className="input input-bordered" required/>
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
                    <button type='submit' className="btn btn-primary">Confirm</button>
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
    </div>  
  )
}

export default ItemManipulationForm