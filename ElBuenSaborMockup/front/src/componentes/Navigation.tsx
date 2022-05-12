import { Button, Form, FormControl, Nav, Navbar, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import { KeyboardEventHandler, useEffect, useState } from 'react';

export const Navigation = () => {

  const navigate = useNavigate();
  
  const [termino, setTermino] = useState<string>("");

  const changeHandler = async(e:any) =>{
    await setTermino(e.target.value);
} 

  const buscar = async () => {
    console.log("Buscar " + termino);
    navigate('/buscar/'+ termino); 
    window.location.reload();
  }

  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter') {
      buscar();
    }
  }

    return (
        <>
            <Navbar bg="primary" variant="dark">
              <Navbar.Brand href="/homePosta">HOME</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/dondeEstamos">Donde Estamos</Nav.Link>
                <br></br>
                <Nav.Link href="/">Productos</Nav.Link>
                <br></br>
                <Nav.Link href="/grilla">Lista Platos</Nav.Link>
                <br></br>
                <Form>
              < Row>
              <Col md={8}><Form.Control type="Text" placeholder="Buscar" defaultValue={termino} onChange={changeHandler} onKeyDown={handleKeyDown}/></Col>
              <Col md={4}><Button type="button" onClick={buscar} variant="outline-light">Search</Button></Col>
              </Row>
              </Form>
                <br></br>     
                <br></br>    
              </Nav>
            </Navbar>
        </>
    )
}