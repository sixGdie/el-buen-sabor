import bcrypt from 'bcryptjs';

interface SeedProduct {
    nombre: string;
    rubro: ValidTypes;
    categoria: ValidCategories;
    imagenes: string[];
    precio: number;
    costoEnvio: number;
    descripcion: string;
    inStock: number;
    slug: string;
    tags: string;
}

interface SeedUser {
    name: string;
    email: string;
    password: string;
    role: 'admin'|'client';
}


type ValidTypes = 'bebidas'|'comidas'|'promos';
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
            role: 'admin'
        },
        {
            name: 'Alberto Gimenez',
            email: 'albertobuensabor@gmail.com',
            password: bcrypt.hashSync('123456'),
            role: 'client'
        },
    ],
    products: [
        {
            nombre: "Tarta de queso y vegetales",
            rubro: 'comidas',
            categoria: 'otro',
            imagenes: [
                'nro1.jpeg',
                'nro1-1.jpeg',
            ],
            precio: 450,
            costoEnvio: 100,
            descripcion: "Tarta de vegetales sabor mediterráneo, apto para veganos",
            inStock: 7,
            slug: "tarta_vegetales_mediterraneo",
            tags: 'tarta',
        },
        {
            nombre: "Pizza romana agridulce",
            rubro: 'comidas',
            categoria: 'pizza',
            imagenes: [
                'nro2.jpeg',
                'nro2-1.jpeg',
            ],
            precio: 700,
            costoEnvio: 100,
            descripcion: "Una pizza distinta para quienes no tienen temor de Dios. Mezcla los sabores mediterraneos de siempre con crema y frutillas. El sabor del pecado, deshonor a la pizza.",
            inStock: 7,
            slug: "pizza_romana_agridulce",
            tags: 'pizza_deshonor',
        },
        {
            nombre: "Papas Fritas",
            rubro: 'comidas',
            categoria: 'guarnicion',
            imagenes: [
                'nro3.jpg',
                'nro3-1.jpg',
            ],
            precio: 300,
            costoEnvio: 100,
            descripcion: "Papas fritas comunes, la opción que nunca falla, nunca decepciona.",
            inStock: 7,
            slug: "papas_fritas",
            tags: 'papas',
        },
        {
            nombre: "Combo papas con barbacoa",
            rubro: 'promos',
            categoria: 'guarnicion',
            imagenes: [
                'nro4.jpeg',
                'nro4-1.jpeg',
            ],
            precio: 400,
            costoEnvio: 100,
            descripcion: "Papas fritas con verdeo y perejil acompañas de dip de salsa barbacoa. Para el gourmet de barrio.",
            inStock: 7,
            slug: "combo_papas_barbacoa",
            tags: 'papas',
        },
        {
            nombre: "Pizza romana",
            rubro: 'comidas',
            categoria: 'pizza',
            imagenes: [
                'nro5.jpeg',
                'nro5-1.jpeg',
            ],
            precio: 650,
            costoEnvio: 100,
            descripcion: "Pizza romana mediterránea clásica. Mozzarella, tomate cherry y albahaca. Al fin comida de verdad.",
            inStock: 7,
            slug: "pizza_romana",
            tags: 'pizza',
        },
        {
            nombre: "Picada",
            rubro: 'comidas',
            categoria: 'otro',
            imagenes: [
                'nro6.jpeg',
                'nro6-1.jpeg',
            ],
            precio: 500,
            costoEnvio: 100,
            descripcion: "Picada simple de embutidos y aceitunas. Bebida no incluída.",
            inStock: 7,
            slug: "picada",
            tags: 'picada',
        },
        {
            nombre: "Hamburguesa bacon con fritas",
            rubro: 'promos',
            categoria: 'hamburguesa',
            imagenes: [
                'nro7.jpeg',
                'nro7-1.jpeg',
            ],
            precio: 700,
            costoEnvio: 100,
            descripcion: "Hamburguesa con bacon frito y guarnición de papas fritas.",
            inStock: 7,
            slug: "hamburguesa_bacon_fritas",
            tags: 'hamburguesa',
        },
        {
            nombre: "Hamburguesa con queso y fritas",
            rubro: 'promos',
            categoria: 'hamburguesa',
            imagenes: [
                'nro8.jpeg',
                'nro8-1.jpeg',
            ],
            precio: 650,
            costoEnvio: 100,
            descripcion: "Hamburguesa con queso y guarnición de papas fritas.",
            inStock: 7,
            slug: "hamburguesa_queso_fritas",
            tags: 'hamburguesa',
        },    
    ]
}