import { useState } from 'react';

import Plato from './Plato';
import { Button, Card, Col, Container, Nav, Row } from 'react-bootstrap';

type PlatoParams = {
    id:number;
    nombre: string;
    rubro: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    descripcion: string;
}

export const ItemPlato = (args : PlatoParams) => {

    return (
        <>
            <br></br><br></br>
            <Card style={{ width: '18rem' }} className="margenesTarjeta"> 
            <Card.Img variant="top" className="maxAltoImg" src={"http://localhost:3000/img/"+args.imagen.toLowerCase()} />
            <Card.Body>
                <Card.Title>{args.nombre}</Card.Title>
                <Card.Text>
                ${args.precio}
                </Card.Text>
                <Card.Text>
                Costo Envío: {args.costoEnvio}
                </Card.Text>
                <Button href={`detalle/${args.id}`} variant="primary">Detalle</Button>
            </Card.Body>
            </Card>
            <br></br><br></br><br></br><br></br>
        </>
    )
}