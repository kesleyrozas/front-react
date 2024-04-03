import React from 'react'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import ConsultaLancamentos from '../views/consultaLancamentos'

import { Route, Switch, HashRouter} from 'react-router-dom'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuario" component={CadastroUsuario}/>
                <Route path="/consultaLancamentos" component={ConsultaLancamentos}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas