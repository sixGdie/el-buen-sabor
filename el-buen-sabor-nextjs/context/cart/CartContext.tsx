import { createContext, VoidFunctionComponent } from "react"
import { ICartProduct } from "../../interfaces";
import { Address } from "./";

interface ContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    sendAddress?: Address;

    addProductToCard: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
    updateAddress: (sendAddress: Address) => void;
}


export const CartContext = createContext({} as ContextProps);