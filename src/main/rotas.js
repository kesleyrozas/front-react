import React from 'react'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos'

import { Route, Switch, HashRouter, Redirect} from 'react-router-dom'
import CadastroLancamentos from '../views/lancamentos/cadastroLancamentos'



function RotaAutenticada( {component: Component, ...props} ){
    return(
        <Route {...props} render={ (componentProps) =>{
            if(true){
                return(
                    <Component {...componentProps} />
                )
            }else{
                return (
                    <Redirect to={ {pathname: '/login', state: { from: componentProps.location} } } />
                )
            }
        }} />
    )
}

function Rotas(){
    return(
        <HashRouter>
            <Switch>            
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuario" component={CadastroUsuario}/>

                <RotaAutenticada path="/home" component={Home}/>
                <RotaAutenticada path="/cadastro-lancamentos/:id?" component={CadastroLancamentos}/>
                <RotaAutenticada path="/consultaLancamentos" component={ConsultaLancamentos}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas