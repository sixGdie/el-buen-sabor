import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { resolveModuleNameFromCache } from 'typescript';
import { getPlatosPorIdFetch, savePlato } from './FuncionesApi';
import { Navigation } from './Navigation';
import Plato from './Plato';


export const FrmPlato = () => {

    const navigate = useNavigate();

    const {idplato} = useParams();
    const [plato, setPlato] = useState<Plato>(new Plato());
    
   
    const getPlato = async () => {
        if(Number(idplato) !== 0){
            let platoSelect:Plato = await getPlatosPorIdFetch(Number(idplato));
            setPlato(platoSelect);
        }else{
            let platoSelect:Plato = new Plato();
            setPlato(platoSelect);
        }
    }


    useEffect(() => {
        getPlato();
    }, []);

    const save = async () => {
        console.log(plato.nombre);
        await savePlato(plato);
        navigate('/grilla'); 
      }
    
    return (
        <>
        <Navigation></Navigation>
        <div className="center">
        <Form className="form-control">
            <Form.Group className="mb-3" controlId="formBasicNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="Text" placeholder="Ingrese el nombre" defaultValue={plato?.nombre} onChange={e => plato.nombre = String(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMarca">
                <Form.Label>Rubro</Form.Label>
                <Form.Control type="Text" placeholder="Ingrese el rubro" defaultValue={plato?.rubro} onChange={e => plato.rubro = String(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImagen">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="Text" placeholder="Ingrese la imagen" defaultValue={plato?.imagen} onChange={e => plato.imagen = String(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrecio">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="Text" placeholder="Ingrese el precio" defaultValue={plato?.precio} onChange={e => plato.precio = Number(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCostoEnvio">
                <Form.Label>Costo Envio</Form.Label>
                <Form.Control type="Text" placeholder="Ingrese el costo de envío" defaultValue={plato?.costoEnvio} onChange={e => plato.costoEnvio = String(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescripción">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="Text" placeholder="Ingrese la descripción" defaultValue={plato?.descripcion} onChange={e => plato.descripcion = String(e.target.value)}/>
            </Form.Group>
            <br/>
            
            <br/><br/>
            <Button onClick={save}  variant="primary" type="button">
                Guardar
            </Button>
        </Form>
        </div>
        </>
    )
}