import { User } from "./user";

export type APIResponse = {
    success: boolean;
    message?: string;
    token?: string;
    userId?: string;
    userProfile?: User;
    wishlists?: Array<any>;
    items?: Array<any>;
};