import { IIngredient } from "./";

export interface IProduct {
    _id: string;
    nombre: string;
    categoria: ICategories;
    imagen: string;
    precio: number;
    descripcion: string;
    estimatedTimeMinutes: number;
    recipe: IIngredientItem[];
    slug: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IIngredientItem {
    ingrediente: IIngredient;
    cantidad: number;
}

export type ICategories = 'bebida'|'hamburguesa'|'pizza'|'pancho'|'guarnicion'|'lomo'|'otro';