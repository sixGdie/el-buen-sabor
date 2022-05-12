import { useEffect, useState } from 'react';
import { ItemPlato } from './ItemPlato';
import { Navigation } from './Navigation';
import Plato from './Plato';
import { Alert, Button, Card, Col, Container, Nav, Row } from 'react-bootstrap';


export const HomePosta = () => {
    return (
        <>
        <Navigation></Navigation>
          <Container fluid="md">
              <Row>  
              El Buen Sabor es un negocio donde hacemos comida y se la llevamos a su casa.
              Usted compra la comida, la recibe, y la come. ¡¿¡Qué más quiere de nosotros!?!
              </Row>
              <Row>
                    <Col><Nav.Link href="/"><h3>Volver</h3></Nav.Link></Col>
              </Row> 
          </Container>
        </>
    )
}

