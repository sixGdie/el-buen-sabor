export interface ICartProduct {
    _id: number;
    nombre: string;
    imagenes: string;
    precio: number;
    costoEnvio: number;
    inStock: number;
    slug: string;
    cantidad: number;
}