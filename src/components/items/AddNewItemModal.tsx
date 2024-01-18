import { APIResponse } from '@/models/apiResponse';
import { Item } from '@/models/items';
import { addNewItem } from '@/pages/api/items';
import React, { useState } from 'react'

function AddNewItemModal({wishlistName, setTriggerWishlistChange} : {wishlistName: string, setTriggerWishlistChange: any}) {

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
            setTriggerWishlistChange(true);

        } catch (error) {
            const errorResponse = await (error as Error).message;
            console.error('API error:', (error as Error).message);       

        }
    };    
    
    
    const handleCloseModal = () => {
        const modal = document.getElementById('addNewItemModal') as HTMLFormElement;
        modal.close();
    }

  return (
    <dialog id="addNewItemModal" className="modal prose max-w-none">
    <div className="modal-box">
      <form method="dialog">
        <button onClick={handleCloseModal} className="btn btn-sm btn-circle absolute right-2 top-2 prose">✕</button>
      </form>
      <div className='mx-auto'>
        
        <form onSubmit={async (e) => handleFormSubmit(e)} className="card-body prose max-w-none">
        <h2 className="card-title prose prose-xl">Add new item to '{wishlistName}'</h2>
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
                <button type='button' className="btn btn-outline">Cancel</button>
            </div>
        </form>         
      </div>
    </div>
  </dialog>
  )
}

export default AddNewItemModal