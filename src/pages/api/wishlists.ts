import { Wishlist } from "@/models/wishlists"
import { APIResponse } from "@/models/apiResponse"
import config from "../../../config"
import { getCookie } from "cookies-next";


export const fetchUserWishlists = async (limit: number, offset: number) => {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/wishlists/getAll?userId=${getCookie("userId")}&limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${getCookie('token')}`,
        }
      });
  
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
  
      const data: APIResponse = await res.json();
      console.log('Inside fetchUserWishlists:', data);
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error as Error);
      throw error;
    }
};

export const fetchWishlistItems = async (wishlistName: string) => {
    //TODO: add limit and offset!
    try {
      const res = await fetch(`${config.API_ENDPOINT}/wishlists/get?userId=${getCookie("userId")}&wishlistName=${wishlistName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${getCookie('token')}`,
        }
      });
  
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
  
      const data: APIResponse = await res.json();
      console.log('Inside fetchWishlistItems:', data);
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error as Error);
      throw error;
    }
};

export const createNewWishlist = async (newWishlistName: string) => {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/wishlists/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${getCookie('token')}`,
        },
        body: JSON.stringify({
            userId: getCookie("userId"),
            wishlistName: newWishlistName
        }),
      });
  
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
  
      const data: APIResponse = await res.json();
      console.log('Inside fetchUserWishlists:', data);
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error as Error);
      throw error;
    }
};

export const deleteWishlist = async (wishlistName: string) => {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/wishlists/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${getCookie('token')}`,
        },
        body: JSON.stringify({
            userId: getCookie("userId"),
            wishlistName: wishlistName
        }),
      });
  
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
  
      const data: APIResponse = await res.json();
      console.log('Inside deleteWishlist:', data);
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error as Error);
      throw error;
    }
};

export const editWishlist = async (currentWishlist: string, wishlistName: string) => {
  try {
    const res = await fetch(`${config.API_ENDPOINT}/wishlists/edit`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${getCookie('token')}`,
      },
      body: JSON.stringify({
          userId: getCookie("userId"),
          wishlistName: currentWishlist,
          newName: wishlistName
      }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const data: APIResponse = await res.json();
    console.log('Inside deleteWishlist:', data);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error as Error);
    throw error;
  }
};
