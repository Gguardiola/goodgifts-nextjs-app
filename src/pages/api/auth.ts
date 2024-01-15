import { SignupBody } from "@/models/user"
import { APIResponse } from "@/models/apiResponse"
import config from "../../../config"

export const fetchSignup = async (formData: SignupBody) => {
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
    console.log('Inside fetchSignup:', data); // Log data inside the fetchSignup function

    return data;
  } catch (error) {
    console.error('Error fetching data:', error as Error);
    throw error;
  }
};


