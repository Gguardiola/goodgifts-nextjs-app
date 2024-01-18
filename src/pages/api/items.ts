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