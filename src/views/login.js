import React from "react";
import Card from '../components/card'
import FormGroup from "../components/form-group"
import { withRouter } from 'react-router-dom'

import UsuarioService from "../app/service/usuarioService";
import { mensagemErro } from '../components/toastr'
import { AuthContext } from '../main/provedorAutenticacao'

class Login extends React.Component{

    state ={
        fields: {
            email: '',
            senha: '',
            mensagem: null
        },
        errors: {},
        disabled : false
     }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            //LocalStorageService.adicionarItem('_usuario_logado', response.data)
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
        }).catch( erro => {
            mensagemErro(erro.response.data)
        })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuario')
    }

    render(){
        return(
            
            <div className="row">
                <div className="col-md-6" style={{position : 'relative', left : '300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Login"> 
                            <div className="row">
                                <span>{this.state.mensagem}</span>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <fieldset>
                                        <FormGroup Label="Email: *" htmlFor="exampleInputEmail1">
                                            <input type="email" 
                                                value={this.state.email || ''}
                                                onChange={e => this.setState({email: e.target.value})}
                                                className="form-control" 
                                                id="exampleInputEmail1" 
                                                aria-describedby="emailHelp" 
                                                placeholder="Digite o Email" />
                                        </FormGroup>
                                        <FormGroup Label="Senha: *" htmlFor="exampleInputPassword1">
                                            <input type="password" 
                                                value={this.state.senha}
                                                onChange={e => this.setState({senha: e.target.value})}
                                                className="form-control" 
                                                id="exampleInputPassword1" 
                                                placeholder="Password" />
                                        </FormGroup>
                                        <br/>
                                        <button onClick={this.entrar} type="button" 
                                                className="btn btn-success m-2">
                                                <i className="pi pi-sign-in"></i> Entrar
                                        </button>
                                        <button onClick={this.prepareCadastrar} type="button" className="btn btn-danger">
                                                <i className="pi pi-save"></i> Cadastrar
                                        </button>
                                    </fieldset>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext

export default withRouter(Login)