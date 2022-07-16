import { IIngredientItem } from ".";

export interface ICartProduct {
    _id: string;
    nombre: string;
    imagen: string;
    precio: number;
    recipe: IIngredientItem[];
    slug: string;
    cantidad: number;
}