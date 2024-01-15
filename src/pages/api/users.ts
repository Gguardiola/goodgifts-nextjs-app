import { User } from "@/models/user"
import { APIResponse } from "@/models/apiResponse"
import config from "../../../config"
import { getCookie } from "cookies-next";


export const fetchUserIdFromEmail = async (formData: User) => {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/users/getId?fromEmail=${formData.email}`, {
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
      console.log('Inside fetchUserIdFromEmail:', data);
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error as Error);
      throw error;
    }
  };

export const fetchUserProfile = async (formData: User) => {
  try {
    const res = await fetch(`${config.API_ENDPOINT}/users/profile?userId=${formData.id}`, {
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
    console.log('Inside fetchSignup:', data);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error as Error);
    throw error;
  }
};