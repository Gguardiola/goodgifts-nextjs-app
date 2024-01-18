import React from 'react'
import { Item } from '@/models/items'
import { format } from 'date-fns';

function ItemCard({item, currentItem, setCurrentItem} : {item: Item, currentItem: Item | null, setCurrentItem: any}) {
    
    console.log('item:', item);
    const creationDate = new Date(item?.created_at || new Date());

    const handleSelectEditItem = () => {
        setCurrentItem(item);
    }

  return (
    <div className="pl-2 m-3 card pt-3 lg:pt-0 lg:card-side bg-base-100 shadow-xl">
        {/* {
            item?.image_name != null ? (
                //TODO: add image bucket s3
                <figure className='mx-auto w-64 h-64'><img className="mask mask-squircle" src="" /></figure>
            ):(
                <figure className='mx-auto w-64 h-64'><img className="mask mask-squircle" src="https://i0.wp.com/usma.ac.pa/wp-content/uploads/2020/02/placeholder.png?ssl=1" /></figure>
            )
        } */}
         <figure className='mx-auto w-64 h-64'><img className="mask mask-squircle" src="https://i0.wp.com/usma.ac.pa/wp-content/uploads/2020/02/placeholder.png?ssl=1" /></figure>

        <div className="card-body">
            <h2 className="card-title prose prose-xl">{item.item_name}</h2>
            <p className='prose prose-base'>{item.item_description}</p>
            {
                item?.item_url != null ? (
                    <p className='prose prose-base'><a className="btn-link" href={item.item_url} target='_blank'>Purchase link</a></p>
                ):(
                    <p className='prose prose-base'><a className="italic opacity-60" target='_blank'>Link not provided</a></p>
                )
            }
            
            <p className='prose prose-base italic'>Item added on {format(creationDate,"yyyy-MM-dd")}</p>
            <div className="lg:card-actions flex lg:flex-none justify-end">
                <button onClick={handleSelectEditItem} className="btn btn-primary grow lg:grow-0 lg:pr-10 lg:pl-10">Edit</button>
            </div>
        </div>
    </div>
  )
}

export default ItemCard