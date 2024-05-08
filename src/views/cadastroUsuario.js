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

    validar(){
        const msgs = []

        if(!this.state.nome){
            msgs.push('O campo nome é obrigatório')
        }
        if(!this.state.email){
            msgs.push('O campo email é obrigatório')
        }else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push('Informe um e-mail valido')
        }
        if(!this.state.senha || !this.state.senhaRepeticao){
            msgs.push('Digite a senha 2x')
        }else if (this.state.senha !== this.state.senhaRepeticao){
            msgs.push('As senhas não são iguais')
        }

        return msgs;
    }

    salvar = () => {
        const msgs = this.validar();

        if(msgs && msgs.length > 0){
            msgs.forEach( (msgs, index) =>{
                mensagemErro(msgs)
            });
            return false;
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
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
                    <button onClick={this.salvar} type="button" className="btn btn-success m-2">Cadastrar</button>
                    <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)