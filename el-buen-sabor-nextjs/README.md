Proyecto de [Next.js](https://nextjs.org/) bootstrapped con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Iniciar

Primero hay que montar una base de datos Mongo.

Para montar el proyecto, usar

```bash
yarn dev
```

Para llenar la base de datos con la seed de productos y usuarios de prueba, ir al navegador a la dirección: [http://localhost:3000/api/seed](http://localhost:3000/api/seed)

El proyecto corre sobre el puerto [http://localhost:3000](http://localhost:3000)

## Fundamental:

Este proyecto está hecho con yarn, no usar nunca npm para trabajar en el mismo.

## Bugs conocidos:

Se usan las cookies para almacenar los productos en el carrito de compras. Al llegar a la página donde hay que ingresar la dirección de envío, se vacía la cookie del carrito de compras, es decir, se reemplaza por un arreglo vacío.

## Pendiente:

Quitar el uso de base de datos Mongo y la api rest nativa y usar en su lugar el backend express con base de datos MySQL
