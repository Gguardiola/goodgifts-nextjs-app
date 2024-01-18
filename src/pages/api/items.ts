import { Item } from "@/models/items"
import { APIResponse } from "@/models/apiResponse"
import config from "../../../config"
import { getCookie } from "cookies-next";


export const addNewItem = async (formData: Item) => {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/items/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${getCookie('token')}`,
        },
        body: JSON.stringify({
            userId: getCookie("userId"),
            item_name: formData.item_name,
            item_description: formData.item_description,
            item_url: formData.item_url || null,
            image_name: formData.image_name || null,
        })
      });
  
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
  
      const data: APIResponse = await res.json();
      console.log('Inside addNewItem:', data);
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error as Error);
      throw error;
    }
};

export const fetchUserItem = async (itemName: string) => {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/items/get?userId=${getCookie('userId')}&itemName=${itemName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${getCookie('token')}`,
        },
      });
  
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
  
      const data: APIResponse = await res.json();
      console.log('Inside fetchUserItem:', data);
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error as Error);
      throw error;
    }
};

export const addToWishlist = async (itemId: number, wishlistName: string) => {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/items/addToWishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${getCookie('token')}`,
        },
        body: JSON.stringify({
            userId: getCookie("userId"),
            itemId: itemId,
            wishlistName: wishlistName,
        })
      });
  
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
  
      const data: APIResponse = await res.json();
      console.log('Inside addToWishlist:', data);
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error as Error);
      throw error;
    }
};

export const editCurrentItem = async (itemId: number, formData: Item) => {
  
    if (formData.item_url === '')   delete formData.item_url;
    if (formData.image_name === '') delete formData.image_name;

    try {
      const res = await fetch(`${config.API_ENDPOINT}/items/edit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${getCookie('token')}`,
        },
        body: JSON.stringify({
            userId: getCookie("userId"),
            itemId: itemId,
            ...formData
            ,
        })
      });
  
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
  
      const data: APIResponse = await res.json();
      console.log('Inside editCurrentItem:', data);
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error as Error);
      throw error;
    }
};

export const deleteCurrentItem = async (itemName: string) => {
  try {
    const res = await fetch(`${config.API_ENDPOINT}/items/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${getCookie('token')}`,
      },
      body: JSON.stringify({
          userId: getCookie("userId"),
          item_name: itemName,
      })
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const data: APIResponse = await res.json();
    console.log('Inside deleteCurrentItem:', data);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error as Error);
    throw error;
  }
};