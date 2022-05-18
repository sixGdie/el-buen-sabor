import * as React from 'react';
import { FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';

export interface CartState {
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
}

interface Props {
    children?: React.ReactNode | undefined,
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
}


export const CartProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( cartReducer , CART_INITIAL_STATE );

    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch(error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
      }, [])

    useEffect(() => {
      Cookie.set('cart', JSON.stringify(state.cart));
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

    return (
        <CartContext.Provider value={{
            ...state,

            addProductToCard,
            updateCartQuantity,
            removeCartProduct,
        }}>
            { children }
        </CartContext.Provider>
    )
};