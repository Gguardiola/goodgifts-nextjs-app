import { Item } from "./items";
import { User } from "./user";
import { Wishlist } from "./wishlists";

export type APIResponse = {
    success: boolean;
    message?: string;
    token?: string;
    userId?: string;
    userProfile?: User;
    wishlists?: Array<Wishlist>;
    items?: Array<Item>;
    item?: Item;
};