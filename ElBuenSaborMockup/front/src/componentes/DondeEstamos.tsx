import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { Navigation } from './Navigation';
import Plato from './Plato';
import { Col, Container, ListGroup, Nav, Row } from 'react-bootstrap';


export const DondeEstamos = () => {

    return (
        <>
        <Navigation></Navigation>
        <Container>
                <Row> 
                    <Col><br/><img alt="dondeEstamos" className="minAltoImg" src={"http://localhost:3000/img/dondeEstamos.jpg"}  /></Col>
                </Row>
                <Row>
                    <Col><Nav.Link href="/"><h3>Volver</h3></Nav.Link></Col>
                </Row>                
                </Container>
        </>
    )
}