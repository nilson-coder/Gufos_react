import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './assets/pages/Home/App';
//importou as paginas
import Categorias from './assets/pages/Categorias/Categorias';
import NotFound from './assets/pages/NotFound/Notfound';
import Eventos from './assets/pages/Eventos/Eventos';
import Login from './assets/pages/Login/Login';
import * as serviceWorker from './serviceWorker';
//importou a biblioteca react-router-dom
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
//realizar a criação das rotas

//Importamos nosso css padrão
import './assets/css/flexbox.css'
import './assets/css/reset.css'
import './assets/css/style.css'


import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const Rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/Categorias" component={ () => <Categorias titulo_pagina="Categorias - Gufos" /> } />
                <Route path="/Eventos" component={Eventos} />
                <Route path="/Login" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(Rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
