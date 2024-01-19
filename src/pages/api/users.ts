import { User } from "@/models/user"
import { APIResponse } from "@/models/apiResponse"
import config from "../../../config"
import { getCookie, setCookie } from "cookies-next";


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
    console.log('Inside fetchUserProfile:', data);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error as Error);
    throw error;
  }
};

export const updateProfile = async (formData: any) => {
    for (const key in formData) {
        if (!formData[key]) {
            delete formData[key];
        }
    }

  console.log("reformed: ", formData);
  try {
    const res = await fetch(`${config.API_ENDPOINT}/users/profile/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${getCookie('token')}`,
      }, body: JSON.stringify({
        userId: getCookie("userId"),
        ...formData,
       } )
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const data: APIResponse = await res.json();
    console.log('Inside updateProfile:', data);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error as Error);
    throw error;
  }
};