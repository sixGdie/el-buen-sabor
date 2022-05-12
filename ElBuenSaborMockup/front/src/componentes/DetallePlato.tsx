import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { getPlatosPorIdFetch } from './FuncionesApi';
import { Navigation } from './Navigation';
import Plato from './Plato';
import { Col, Container, ListGroup, Nav, Row } from 'react-bootstrap';


export const DetallePlato = () => {

    const {idplato} = useParams();
    const [plato, setPlato] = useState<Plato>();
    
    let platoId:number = 0;
    
    const getPlato = async () => {
      let platoSelect:Plato = 
        await getPlatosPorIdFetch(Number(platoId));
      setPlato(platoSelect);
    }

    useEffect(() => {
        if(idplato){
            platoId = parseInt(idplato);
        }
        getPlato();
    }, []);

    
    return (
        <>
        <Navigation></Navigation>
        <Container>
                <Row> 
                    <Col><br/><img alt="plato" className="minAltoImg" src={"http://localhost:3000/img/"+plato?.imagen}  /></Col>
                    <Col>
                        <Row>
                            <Col><h1>{plato?.nombre}</h1></Col>
                        </Row>
                        <Row>
                        <Col><h2>${plato?.precio}</h2></Col>
                        </Row>
                        <Row>
                            <Col>Rubro: <h3>{plato?.rubro}</h3></Col>
                        </Row>
                        <Row>
                            <Col>Costo Envío: <h3>{plato?.costoEnvio}</h3></Col>
                        </Row>
                        <Row>
                            <Col>Descripción: <h3>{plato?.descripcion}</h3></Col>     
                        </Row>
                    </Col>
                </Row>
                
                <Row>
                    <Col><Nav.Link href="/"><h3>Volver</h3></Nav.Link></Col>
                </Row>                
                </Container>
        </>
    )
}