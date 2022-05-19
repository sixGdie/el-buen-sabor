import { IUser } from "./";

export interface IOrder {
    _id?: string;
    user?: IUser | string;
    orderItems: IOrderItem[];
    sendAddress: SendAddress;
    paymentResult?: string;
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    isPaid: boolean;
    paidAt?: string;
    transactionId?: string;
}

export interface IOrderItem {
    _id: string;
    nombre: string;
    cantidad: number;
    slug: string;
    imagenes: string;
    precio: number;
    inStock: number;
}

export interface SendAddress {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    cp: string;
    department: string;
    phone: string;
}