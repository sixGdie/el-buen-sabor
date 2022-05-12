import React, { Component, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './componentes/Home';
import { DetallePlato } from './componentes/DetallePlato';
import { HomePosta } from './componentes/HomePosta';
import { DondeEstamos } from './componentes/DondeEstamos';
import { FrmPlato } from './componentes/FrmPlato';
import { GrillaPlatos } from './componentes/GrillaPlatos';


class AppRutas extends Component{
  
  render(){
    return (
      <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/detalle">
              <Route path=":idplato" element={<DetallePlato />} />
            </Route>
            <Route path="/grilla" element={<GrillaPlatos/>}/>
            <Route path="/buscar/:termino" element={<Home/>}/>
            <Route path="/formulario/:idplato" element={<FrmPlato/>}/>
            <Route path="/homePosta" element={<HomePosta/>}/>
            <Route path="/dondeEstamos" element={<DondeEstamos/>}/>
            <Route path="/test" element={<h1>TEST</h1>}/>
            <Route path="*" element={<Home/>}/>
          </Routes>
      </Router>
    );
  }
}

export default AppRutas;
