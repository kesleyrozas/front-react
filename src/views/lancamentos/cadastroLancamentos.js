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
        valor: ''
    }

    constructor(){
        super();
        this.lancamentosService = new LancamentosService();
    }

    submit = () =>{
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const {descricao, mes, ano, tipo, valor} = this.state;
        const lancamento = {descricao, mes, ano, tipo, valor, usuario: usuarioLogado.id };
        console.log(lancamento);
        this.lancamentosService
        .salvar(lancamento)
        .then(response =>{
            messages.mensagemSucesso("Lançamento cadastrado com sucesso")
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
            <Card title="Cadastro de Lançamentos">
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
                        <button className="btn btn-success" onClick={this.submit}>Salvar</button>
                        <button className="btn btn-danger">Cancelar</button>
                    </div>
                </div>

            </Card>
        )
    }

}

export default withRouter(CadastroLancamentos)