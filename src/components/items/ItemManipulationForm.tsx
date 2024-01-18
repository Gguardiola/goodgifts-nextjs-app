import React from 'react'

function ItemManipulationForm() {
  return (
    <div className="mt-5 lg:mt-0  bg-base-100 p-1 pb-3 pr-3 grow rounded-box">
        <div className='md:flex justify-between'>
            <div className='pr-5 pl-5 pt-5'>
                <div className='flex gap-3'>
                    <h2 className='prose text-2xl font-bold'>Edit Item</h2>
                </div>
                <p className='prose prose-base opacity-80'>Item added on 10-10-1999</p>

            </div>
            <div className='pr-5 pl-5 pt-5'>
                <button className='btn btn-outline btn-error'>Delete</button>
            </div>
        </div>
        <div className='divider pr-5 pl-5'></div>
        <div className='overflow-y-auto'>
            <form className="card-body prose max-w-none">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input name='item_name' defaultValue="Pata de jamón ibérico 5J D.O" type="text" placeholder="Name" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input name="item_description" defaultValue="Para mi cumpleaños, lo mejor." type="text" placeholder="Description" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">URL (optional)</span>
                    </label>
                    <input name="item_url" type="text" placeholder="https://www.example.com" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Image (optional)</span>
                    </label>
                    <input type="file" placeholder="You can't touch this" className="file-input file-input-bordered w-full max-w-xs" disabled />
                </div>                            
                <div className="form-control mt-6">
                    <button type='submit' className="btn btn-primary">Confirm</button>
                </div>
                <div className='form-control mt-6 m-auto'>
                    <button type='button' className="btn btn-circle btn-outline">
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