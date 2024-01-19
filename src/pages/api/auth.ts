import { User } from "@/models/user"
import { APIResponse } from "@/models/apiResponse"
import config from "../../../config"
import { getCookie } from "cookies-next";

export const fetchSignup = async (formData: User) => {
  try {
    const res = await fetch(`${config.API_ENDPOINT}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
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

export const fetchLogin = async (formData: User) => {
  try {
    const res = await fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const data: APIResponse = await res.json();
    console.log('Inside fetchLogin:', data); 

    return data;
  } catch (error) {
    console.error('Error fetching data:', error as Error);
    throw error;
  }
};

export const fetchLogout = async () => {
  try {
    const res = await fetch(`${config.API_ENDPOINT}/auth/logout`, {
      method: 'POST',
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
    console.log('Inside fetchLogout:', data); 

    return data;
  } catch (error) {
    console.error('Error fetching data:', error as Error);
    throw error;
  }
};



