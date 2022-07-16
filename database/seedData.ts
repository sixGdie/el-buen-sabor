import bcrypt from 'bcryptjs';

interface SeedProduct {
    nombre: string;
    categoria: ValidCategories;
    imagen: string;
    precio: number;
    descripcion: string;
    estimatedTimeMinutes: number;
    recipe: SeedIngredientItem[];
    slug: string;
    active: boolean;
}

interface SeedUser {
    name: string;
    email: string;
    password: string;
    role: 'Admin'|'User'|'Chef'|'Delivery'|'Cashier';
}

interface SeedIngredient {
    nombre: string;
    unidadMedida: ValidUnits;
    categoria: ValidIngredientCategories;
    costoUnidad: number;
    inStock: number;
    minStock: number;
    slug: string;
    active: boolean;
}

interface SeedIngredientItem {
    ingrediente: SeedIngredient;
    cantidad: number;
}


type ValidUnits = 'Kg'|'Lt'|'Gr'|'Unidad'|'Otro';
type ValidIngredientCategories = 'bebida'|'lacteos'|'carne'|'panificados'|'vegetales'|'condimentos'|'otro';
type ValidCategories = 'bebida'|'hamburguesa'|'pizza'|'pancho'|'guarnicion'|'lomo'|'otro';

interface SeedData {
    users: SeedUser[];
    products: SeedProduct[],
}




export const initialData: SeedData = {
    users: [
        {
            name: 'Juan Carlos BuenSabor',
            email: 'juanbuensabor@gmail.com',
            password: bcrypt.hashSync('123456'),
            role: 'Admin'
        },
        {
            name: 'Alberto Gimenez',
            email: 'albertobuensabor@gmail.com',
            password: bcrypt.hashSync('123456'),
            role: 'User'
        },
    ],
    products: [
        {
            nombre: "Tarta de queso y vegetales",
            categoria: 'otro',
            imagen: 'nro1.jpeg',
            precio: 450,
            descripcion: "Tarta de vegetales sabor mediterráneo, apto para veganos",
            estimatedTimeMinutes: 15,
            recipe: [
                {
                    ingrediente: {
                        nombre: 'Queso',
                        unidadMedida: 'Kg',
                        categoria: 'lacteos',
                        costoUnidad: 1.5,
                        inStock: 10,
                        minStock: 5,
                        slug: 'queso',
                        active: true,
                    },
                    cantidad: 1.5,
                },
                {
                    ingrediente: {
                        nombre: 'Tomate',
                        unidadMedida: 'Kg',
                        categoria: 'vegetales',
                        costoUnidad: 1.5,
                        inStock: 10,
                        minStock: 5,
                        slug: 'tomate',
                        active: true,
                    },
                    cantidad: 1.5,
                },
                {
                    ingrediente: {
                        nombre: 'Cebolla',
                        unidadMedida: 'Kg',
                        categoria: 'vegetales',
                        costoUnidad: 1.5,
                        inStock: 10,
                        minStock: 5,
                        slug: 'cebolla',
                        active: true,
                    },
                    cantidad: 1.5,
                }
            ],
            slug: "tarta_vegetales_mediterraneo",
            active: true,
        },
        {
            nombre: "Tarta de queso y vegetales",
            categoria: 'otro',
            imagen: 'nro1.jpeg',
            precio: 450,
            descripcion: "Tarta de vegetales sabor mediterráneo, apto para veganos",
            estimatedTimeMinutes: 15,
            recipe: [
                {
                    ingrediente: {
                        nombre: 'Queso',
                        unidadMedida: 'Kg',
                        categoria: 'lacteos',
                        costoUnidad: 1.5,
                        inStock: 10,
                        minStock: 5,
                        slug: 'queso',
                        active: true,
                    },
                    cantidad: 1.5,
                },
                {
                    ingrediente: {
                        nombre: 'Tomate',
                        unidadMedida: 'Kg',
                        categoria: 'vegetales',
                        costoUnidad: 1.5,
                        inStock: 10,
                        minStock: 5,
                        slug: 'tomate',
                        active: true,
                    },
                    cantidad: 1.5,
                },
                {
                    ingrediente: {
                        nombre: 'Cebolla',
                        unidadMedida: 'Kg',
                        categoria: 'vegetales',
                        costoUnidad: 1.5,
                        inStock: 10,
                        minStock: 5,
                        slug: 'cebolla',
                        active: true,
                    },
                    cantidad: 1.5,
                }
            ],
            slug: "tarta_vegetales_mediterraneo",
            active: true,
        },
        {
            nombre: "Tarta de queso y vegetales",
            categoria: 'otro',
            imagen: 'nro1.jpeg',
            precio: 450,
            descripcion: "Tarta de vegetales sabor mediterráneo, apto para veganos",
            estimatedTimeMinutes: 15,
            recipe: [
                {
                    ingrediente: {
                        nombre: 'Queso',
                        unidadMedida: 'Kg',
                        categoria: 'lacteos',
                        costoUnidad: 1.5,
                        inStock: 10,
                        minStock: 5,
                        slug: 'queso',
                        active: true,
                    },
                    cantidad: 1.5,
                },
                {
                    ingrediente: {
                        nombre: 'Tomate',
                        unidadMedida: 'Kg',
                        categoria: 'vegetales',
                        costoUnidad: 1.5,
                        inStock: 10,
                        minStock: 5,
                        slug: 'tomate',
                        active: true,
                    },
                    cantidad: 1.5,
                },
                {
                    ingrediente: {
                        nombre: 'Cebolla',
                        unidadMedida: 'Kg',
                        categoria: 'vegetales',
                        costoUnidad: 1.5,
                        inStock: 10,
                        minStock: 5,
                        slug: 'cebolla',
                        active: true,
                    },
                    cantidad: 1.5,
                }
            ],
            slug: "tarta_vegetales_mediterraneo",
            active: true,
        },
        {
            nombre: "Tarta de queso y vegetales",
            categoria: 'otro',
            imagen: 'nro1.jpeg',
            precio: 450,
            descripcion: "Tarta de vegetales sabor mediterráneo, apto para veganos",
            estimatedTimeMinutes: 15,
            recipe: [
                {
                    ingrediente: {
                        nombre: 'Queso',
                        unidadMedida: 'Kg',
                        categoria: 'lacteos',
                        costoUnidad: 1.5,
                        inStock: 10,
                        minStock: 5,
                        slug: 'queso',
                        active: true,
                    },
                    cantidad: 1.5,
                },
                {
                    ingrediente: {
                        nombre: 'Tomate',
                        unidadMedida: 'Kg',
                        categoria: 'vegetales',
                        costoUnidad: 1.5,
                        inStock: 10,
                        minStock: 5,
                        slug: 'tomate',
                        active: true,
                    },
                    cantidad: 1.5,
                },
                {
                    ingrediente: {
                        nombre: 'Cebolla',
                        unidadMedida: 'Kg',
                        categoria: 'vegetales',
                        costoUnidad: 1.5,
                        inStock: 10,
                        minStock: 5,
                        slug: 'cebolla',
                        active: true,
                    },
                    cantidad: 1.5,
                }
            ],
            slug: "tarta_vegetales_mediterraneo",
            active: true,
        },
        {
            nombre: "Tarta de queso y vegetales",
            categoria: 'otro',
            imagen: 'nro1.jpeg',
            precio: 450,
            descripcion: "Tarta de vegetales sabor mediterráneo, apto para veganos",
            estimatedTimeMinutes: 15,
            recipe: [
                {
                    ingrediente: {
                        nombre: 'Queso',
                        unidadMedida: 'Kg',
                        categoria: 'lacteos',
                        costoUnidad: 1.5,
                        inStock: 10,
                        minStock: 5,
                        slug: 'queso',
                        active: true,
                    },
                    cantidad: 1.5,
                },
                {
                    ingrediente: {
                        nombre: 'Tomate',
                        unidadMedida: 'Kg',
                        categoria: 'vegetales',
                        costoUnidad: 1.5,
                        inStock: 10,
                        minStock: 5,
                        slug: 'tomate',
                        active: true,
                    },
                    cantidad: 1.5,
                },
                {
                    ingrediente: {
                        nombre: 'Cebolla',
                        unidadMedida: 'Kg',
                        categoria: 'vegetales',
                        costoUnidad: 1.5,
                        inStock: 10,
                        minStock: 5,
                        slug: 'cebolla',
                        active: true,
                    },
                    cantidad: 1.5,
                }
            ],
            slug: "tarta_vegetales_mediterraneo",
            active: true,
        },
            
    ]
}