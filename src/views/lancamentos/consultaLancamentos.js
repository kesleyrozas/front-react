import React from "react";
import { withRouter } from 'react-router-dom'
import Card from "../../components/card"
import FormGroup from "../../components/form-group"
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentosService from "../../app/service/lancamentosService";
import LocalStorageService from "../../app/service/localStorageService";
import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ConsultaLancamentos extends React.Component{
    
    state = {
        mes: '',
        ano: '', 
        tipo: '',
        descricao: '',
        lancamentos: [],
        lancamentoDeletar: {},
        showConfirmDialog: false
    }

    constructor(){
        super()
        this.lancamentosService = new LancamentosService();
    }

    buscar = () => {

        if(!this.state.ano){
            messages.mensagemErro("O preenchimento do ano e obrigatório")
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.lancamentosService.consultar(lancamentoFiltro)
        .then( resposta => {
            this.setState({lancamentos: resposta.data})
        }).catch( error =>{

        })
    }

    editarAction = (id) => {

    }

    abrirConfirmacao = (lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoDeletar : lancamento})
    }

    cancelarDelecao = (lancamento) => {
        this.setState({showConfirmDialog: false, lancamentoDeletar : {}})
    }

    deletar = (lancamentoDeletar) => {
        this.lancamentosService.deletar(this.state.lancamentoDeletar.id)
        .then(response => {
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(this.state.lancamentoDeletar) //Pega o index 
            lancamentos.splice(index, 1); //Remove o elemento e indica a quantidade de item que quer deletar
            this.setState({lancamentos: lancamentos, showConfirmDialog: false })  // Recarrega o estado da tela para atualizar

            messages.mensagemSucesso('Lançamento deletado com sucesso!')
        }).catch(error =>{
            messages.mensagemErro('Ocorreu um erro ao deletar o lançamento')
        })
    }

    render(){

        const meses = this.lancamentosService.obterListaMeses();
        const tipos = this.lancamentosService.obterListaTipos();

        const footerContent = (
            <div>
                <Button label="Não" icon="pi pi-times" onClick={(this.cancelarDelecao)} className="p-button-text" />
                <Button label="Sim" icon="pi pi-check" onClick={(this.deletar)} autoFocus />
            </div>
        );

        return(
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup label="Ano: *" htmlFor="inputAno">
                                <input type="text"
                                        id="inputAno"
                                        value={this.state.ano}
                                        onChange={e => this.state({ano: e.target.value})}
                                        className="form-control"
                                        placeholder="Digite o ano"/>
                            </FormGroup>
                            <FormGroup label="Mês: " htmlFor="inputMes">
                                <SelectMenu id="inputMes"
                                            className="form-control" 
                                            value={this.state.mes}
                                            onChange={e => this.state({mes: e.target.value})}
                                            lista={meses}>
                                </SelectMenu>
                            </FormGroup>
                            <FormGroup label="Tipo: " htmlFor="inputTipo">
                                <SelectMenu id="inputTipo"
                                            className="form-control" 
                                            value={this.state.tipo}
                                            onChange={e => this.state({tipo: e.target.value})}
                                            lista={tipos}>
                                </SelectMenu>
                            </FormGroup>
                            <FormGroup label="Descricao: " htmlFor="inputDescricao">
                                <input type="text"
                                            id="inputDescricao"
                                            value={this.state.descricao}
                                            onChange={e => this.state({descricao: e.target.value})}
                                            className="form-control"
                                            placeholder="Digite uma descrição"/>
                            </FormGroup>
                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-componet">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                                deletar={this.abrirConfirmacao}
                                                editarAction={this.editar}/>
                        </div>
                    </div>
                </div>
                <div>                
                <Dialog header="" 
                        visible={this.state.showConfirmDialog} 
                        style={{ width: '50vw' }} 
                        modal={true}
                        footer={footerContent}
                        onHide={() => this.setVisible({showConfirmDialog: false})}>
                    Tem certeza que deseja excluir os dados deste lançamento?
                </Dialog>
                </div>
            </Card>
        )
    }

}

export default withRouter(ConsultaLancamentos)