import * as React from 'react';
import { FC, useEffect, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';
import Cookies from 'js-cookie';

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    sendAddress?: Address;
}

export interface Address {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    cp: string;
    department: string;
    phone: string;
}

interface Props {
    children?: React.ReactNode | undefined,
}

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    sendAddress: undefined,
}


export const CartProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( cartReducer , CART_INITIAL_STATE );

    useEffect(() => {
        try {
            const cookieProducts = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch(error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
      }, [])

    useEffect(() => {

        if (Cookies.get('firstName')) {
            const sendAddress = {
                firstName: Cookies.get('firstName') || '',
                lastName: Cookies.get('lastName') || '',
                address: Cookies.get('address') || '',
                address2: Cookies.get('address2') || '',
                cp: Cookies.get('cp') || '',
                department: Cookies.get('department') || '',
                phone: Cookies.get('phone') || '',
            }
    
            dispatch({ type: '[Cart] - LoadAddress from Cookies', payload: sendAddress })
        }   
    },[])

    useEffect(() => {
      Cookies.set('cart', JSON.stringify(state.cart));
    }, [state.cart])

    useEffect(() => {
        
        const numberOfItems = state.cart.reduce((prev, current) => current.cantidad + prev, 0);
        const subTotal = state.cart.reduce((prev, current) => (current.cantidad * current.precio) + prev, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0.21);

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });

    }, [state.cart])
    

    const addProductToCard = (product: ICartProduct) => {
        const productInCart = state.cart.some(item => item._id === product._id);
        if (!productInCart) return dispatch({ 
                                        type: '[Cart] - Update products in cart', 
                                        payload: [...state.cart, product] 
                                    });
        const updatedProducts = state.cart.map(item => {
            if (item._id !== product._id) return item;

            item.cantidad += product.cantidad;

            return item;
        });
        
        dispatch({ 
            type: '[Cart] - Update products in cart', 
            payload: updatedProducts 
        });
    }
        
    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Change product quantity', payload: product });
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    }

    const updateAddress = (address: Address) => {
        Cookies.set('firstName', address.firstName);
        Cookies.set('lastName', address.lastName);
        Cookies.set('address', address.address);
        Cookies.set('address2', address.address2 || '');
        Cookies.set('cp', address.cp);
        Cookies.set('department', address.department);
        Cookies.set('phone', address.phone);

        dispatch({ type: '[Cart] - Update Address', payload: address });
    }

    return (
        <CartContext.Provider value={{
            ...state,

            addProductToCard,
            updateCartQuantity,
            removeCartProduct,
            updateAddress,
        }}>
            { children }
        </CartContext.Provider>
    )
};