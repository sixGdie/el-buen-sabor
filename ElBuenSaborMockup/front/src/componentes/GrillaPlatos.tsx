import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { DetallePlato } from './DetallePlato';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePlatoPorId, getPlatosJSONFetch, getPlatosPorIdFetch } from './FuncionesApi';
import { Navigation } from './Navigation';
import Plato from './Plato';


export const GrillaPlatos = () => {
    
  const navigate = useNavigate();
  
  const [platos, setPlatos] = useState<Plato[]>([]);
    
    const getPlatos = async () => {
      let datos:Plato[] = await getPlatosJSONFetch();
      setPlatos(datos);
    }

    useEffect(() => {
      getPlatos();
    }, []);

    
    
    const deletePlato = async (idPlato:number) => {
      await deletePlatoPorId(idPlato);
      window.location.reload();
    }
    
    return (
        <>
        <Navigation></Navigation>
          <Container fluid="md">
            <br/>
            <Button href={`/formulario/0`} variant="outline-primary">Nuevo</Button>
            < Row>
                <Col md={1}>
                <b>ID</b>
                </Col>
                <Col md={3}>
                <b>Nombre</b>
                </Col>
                <Col md={2}>
                <b>Rubro</b>
                </Col>
                <Col md={2}>
                <b>Precio</b>
                </Col>
                <Col md={2}>
                <b>Modificar</b>
                </Col>
                <Col md={2}>
                <b>Eliminar</b>
                </Col>
            </Row>
          {platos.map((plato:Plato) => 
            <Row key={plato.id}>
                <Col md={1}>
                {plato.id}
                </Col>
                <Col md={3}>
                {plato.nombre}
                </Col>
                <Col md={2}>
                {plato.rubro}
                </Col>
                <Col md={2}>
                {plato.precio}
                </Col>
                <Col md={2}>
                <Button variant="outline-warning" href={`/formulario/` + plato.id}>Modificar</Button>
                </Col>
                <Col md={2}>
                <Button variant="outline-danger" onClick={(e) => deletePlato(plato.id)}>Eliminar</Button>
                </Col>
            </Row>
               )}
          </Container>
        </>
    )
}