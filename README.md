# El Buen Sabor

## Proyecto final para Universidad Tecnológica Nacional de Mendoza
## Integrantes:
> - Dartsch, Germán
> - Barroso, Matías
> - Zabala, Diego

Proyecto de [Next.js](https://nextjs.org/) bootstrapped con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Iniciar

Primero hay que montar una base de datos Mongo.

Adicionalmente hay que reconstruir los paquetes y dependencias del proyecto usando

```bash
yarn install
```

Para montar el proyecto, usar

```bash
yarn dev
```

Para llenar la base de datos con la seed de productos y usuarios de prueba, ir al navegador a la dirección: [http://localhost:3000/api/seed](http://localhost:3000/api/seed)

El proyecto corre sobre el puerto [http://localhost:3000](http://localhost:3000)

## Fundamental:

Este proyecto está hecho con yarn, no usar nunca npm para trabajar en el mismo.

## Versión de node:
    
```bash
v16.14.2
```

## Bugs conocidos:

Nada por ahora

## Pendiente:

- Quitar el uso de base de datos Mongo y la api rest nativa y usar en su lugar el backend express con base de datos MySQL (Siendo sinceros, me gusta mucho la api rest nativa, evaluaría hacer las consultas de sql desde acá y descartar la idea de usar sequelize tal como dijimos con el profe Yacomo) 
- Ver que hacer con el costo de envío (actualmente sólo existe como placeholder en la página del carrito y sumario pero ni se calcula. Además, los productos en la db tienen cada uno su costo de envío...por ninguna razón. Cambiar eso)
