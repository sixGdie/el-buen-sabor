export interface IProduct {
    id: number;
    nombre: string;
    rubro: ITypes;
    categoria: ICategories;
    imagenes: string[];
    precio: number;
    costoEnvio: number;
    descripcion: string;
    inStock: number;
    slug: string;
    tags: string[];
}

export type ITypes = 'bebidas'|'comidas'|'promos';
export type ICategories = 'bebida'|'hamburguesa'|'pizza'|'pancho'|'guarnicion'|'lomo'|'otro';