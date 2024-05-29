import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import * as messages from '../../components/toastr'

import LancamentosService from "../../app/service/lancamentosService";
import LocalStorageService from "../../app/service/localStorageService";

class CadastroLancamentos extends React.Component{

    state = {
        id: null,
        mes: '',
        ano: '', 
        tipo: '',
        descricao: '',
        status: '',
        valor: '',
        usuario: null,
        atualizando: false
    }

    constructor(){
        super();
        this.lancamentosService = new LancamentosService();
    }

    componentDidMount(){
        const params = this.props.match.params;

        if(params.id){
            this.lancamentosService.obterPorId(params.id)
            .then(response => 
                {this.setState( {...response.data, atualizando: true} )}
            ).catch(erros =>{
                messages.mensagemErro(erros.response.data)
            })
        }
    }

    submit = () =>{
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado'); // Busca o usuário logado

        const {descricao, mes, ano, tipo, valor} = this.state;
        const lancamento = {descricao, mes, ano, tipo, valor, usuario: usuarioLogado.id };

        try{
            this.lancamentosService.validar(lancamento)
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(element => {
                messages.mensagemErro(element)
            });
            return false;
        }

        //console.log(lancamento);
        this.lancamentosService
        .salvar(lancamento)
        .then(response =>{
            messages.mensagemSucesso("Lançamento cadastrado com sucesso")
        }).catch(error =>{
            messages.mensagemErro(error.response.data)
        })
    }

    atualizar = () =>{
        const {descricao, mes, ano, tipo, valor, id, usuario} = this.state;
        const lancamento = {descricao, mes, ano, tipo, valor, id, usuario };
        //console.log(lancamento);
        this.lancamentosService
        .atualizar(lancamento)
        .then(response =>{
            messages.mensagemSucesso("Lançamento atualizado com sucesso")
        }).catch(error =>{
            messages.mensagemErro(error.response.data)
        })
    }


    handleChange = (event) =>{
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value})
    }

    render(){

        const tipos = this.lancamentosService.obterListaTipos();
        const meses = this.lancamentosService.obterListaMeses();    

        return(
            <Card title={ this.state.atualizando ? 'Atualizando Lançamento' : 'Cadastro de Lançamento' }>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup Label="Descrição: *" htmlFor="inputDescricao">
                            <input id="inputDescricao" 
                                    type="text" 
                                    name="descricao"
                                    value={this.state.descricao}
                                    onChange={this.handleChange}
                                    className="form-control"/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" Label="Ano: *">
                            <input id="inputAno" 
                                    type="text" 
                                    name="ano"
                                    value={this.state.ano}
                                    onChange={this.handleChange}
                                    className="form-control"/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMês" Label="Mês: *">
                            <SelectMenu id="inputMes"
                                        className="form-control" 
                                        name="mes"
                                        value={this.state.mes}
                                        onChange={this.handleChange}
                                        lista={meses}>
                            </SelectMenu>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValor" Label="Valor: *">
                            <input id="inputValor" 
                                    type="text" 
                                    name="valor"
                                    value={this.state.valor}
                                    onChange={this.handleChange}
                                    className="form-control"/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" Label="Tipo: *">
                            <SelectMenu id="inputTipo"
                                        className="form-control" 
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.handleChange}
                                        lista={tipos}>
                            </SelectMenu>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" Label="Status: *">
                            <input type="text" 
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.handleChange}
                                    className="form-control" 
                                    disabled/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {   this.state.atualizando ? 
                            (
                                <button className="btn btn-success m-2" onClick={this.atualizar}>Atualizar</button>                        
                            ) : (
                                <button className="btn btn-success m-2" onClick={this.submit}>Salvar</button>
                            )
                        }
                        <button className="btn btn-danger">Cancelar</button>
                    </div>
                </div>

            </Card>
        )
    }

}

export default withRouter(CadastroLancamentos)