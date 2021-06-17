import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
 
import MainProduto from './pages/clientes/main';
import DetalhesProduto from './pages/clientes/detalhes';
import CriarProduto from './pages/clientes/criar';
import EditarProduto from './pages/clientes/editar';
import DeletarProduto from './pages/clientes/deletar';
 
const Routes = () => (
 
    <BrowserRouter>
        <Switch>
            <Route exact path="/produto" component={MainProduto} />
            <Route path="/produto/:id" component={DetalhesProduto} />
            <Route path="/criarproduto" component={CriarProduto} />
            <Route path="/editarproduto/:id" component={EditarProduto} />
            <Route path="/deletarproduto/:id" component={DeletarProduto} />
        </Switch>
    </BrowserRouter>
)
 
export default Routes;