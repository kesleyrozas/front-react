import React from "react"

import Card from "../components/card"
import FormGroup from "../components/form-group"

import { withRouter } from 'react-router-dom'
import UsuarioService from "../app/service/usuarioService"
import { mensagemSucesso, mensagemErro } from "../components/toastr"

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    salvar = () => {

        const {nome, email, senha, senhaRepeticao} = this.state
        const usuario = { nome, email, senha, senhaRepeticao }

        try{
            this.service.validar(usuario)
        }catch(erro){
            const mensagens = erro.mensagens
            mensagens.forEach(element => {
                mensagemErro(element)
            });
            return false;
        }

        this.service.salvar(usuario)
            .then(response =>{
                mensagemSucesso('Usuário Cadastrado com sucesso!')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () =>{
        this.props.history.push('/login')
    }

    render(){
        return(
          
            <Card title="Cadastro de Usuário">
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <FormGroup Label="Nome: *" htmlFor="inputNome">
                        <input type="text"
                                id="inputNome"
                                className="form-control"
                                name="nome"
                                onChange={e => this.setState({nome: e.target.value})}/>
                        </FormGroup>
                        <FormGroup Label="Email: *" htmlFor="inputEmail">
                        <input type="email"
                                id="inputEmail"
                                className="form-control"
                                name="email"
                                onChange={e => this.setState({email: e.target.value})}/>
                        </FormGroup>
                        <FormGroup Label="Senha: *" htmlFor="inputSenha">
                        <input type="password"
                                id="inputSenha"
                                className="form-control"
                                name="senha"
                                onChange={e => this.setState({senha: e.target.value})}/>
                        </FormGroup>
                        <FormGroup Label="Repetir Senha: *" htmlFor="inputSenhaRepetir">
                        <input type="password"
                                id="inputSenhaRepetir"
                                className="form-control"
                                name="senhaRepeticao"
                                onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                        </FormGroup>
                        <br/>
                    <button onClick={this.salvar} type="button" className="btn btn-success m-2">
                        <i className="pi pi-save"></i> Cadastrar
                    </button>
                    <button onClick={this.cancelar} type="button" className="btn btn-danger">
                        <i className="pi pi-times"></i> Cancelar
                    </button>
                    </div>
                </div>
            </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)