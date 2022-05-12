import { useEffect, useState } from 'react';
import { getPlatosJSONFetch, getPlatosPorBusqueda } from './FuncionesApi';
import { ItemPlato as ItemPlato } from './ItemPlato';
import { Navigation } from './Navigation';
import Plato from './Plato';
import { Alert, Button, Card, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


export const Home = () => {
    
  const {termino} = useParams();

  const [platos, setPlatos] = useState<Plato[]>([]);
    
    const getPlatos = async () => {
      console.log("TERMINO " + termino);
      if(termino && termino != ""){
        let datos:Plato[] = await getPlatosPorBusqueda(termino);
        setPlatos(datos);
      }else{
        let datos:Plato[] = await getPlatosJSONFetch();
        setPlatos(datos);
      }
    }

    useEffect(() => {
      getPlatos();
    }, []);

    
    return (
        <>
        <Navigation></Navigation>
          <Container fluid="md">
              <Row>  
               {platos.map((plato:Plato) => 
                <ItemPlato 
                  key={plato.id} 
                  id={plato.id} 
                  nombre={plato.nombre}
                  rubro={plato.rubro}
                  imagen={plato.imagen}
                  precio={plato.precio} 
                  costoEnvio={plato.costoEnvio}
                  descripcion={plato.descripcion}
                  ></ItemPlato>
               )}
              </Row>
          </Container>
        </>
    )
}

