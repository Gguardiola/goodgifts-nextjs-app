import React from 'react'
import { Item } from '@/models/items'

function ItemCard({item} : {item: Item}) {
    console.log('item:', item);
  return (
    <div className="pl-2 m-3 card pt-3 lg:pt-0 lg:card-side bg-base-100 shadow-xl">
        <figure><img className="mask mask-squircle" src="https://daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg" /></figure>
        <div className="card-body">
            <h2 className="card-title prose prose-xl">Pata de jamón ibérico 5J D.O</h2>
            <p className='prose prose-base'>Para mi cumpleaños, lo mejor.</p>
            <p className='prose prose-base'><a className="btn-link" href="www.google.com" target='_blank'>Purchase link</a></p>
            <p className='prose prose-base italic'>Item added on 10-10-1999</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-error">Delete Item</button>
            </div>
        </div>
    </div>
  )
}

export default ItemCard