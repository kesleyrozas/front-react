import React from "react";
import currencyFormatter from 'currency-formatter'

export default props =>{

    const rows = props.lancamentos.map( lancamentos =>{
        return(
            <tr key={lancamentos.id}>
                <td>{lancamentos.descricao}</td>
                <td>{currencyFormatter.format(lancamentos.valor, {locale: 'pt-BR'})}</td>
                <td>{lancamentos.tipo}</td>
                <td>{lancamentos.mes}</td>
                <td>{lancamentos.status}</td>
                <td>
                    <button 
                        type="button" 
                        title="Efetivar"
                        disabled={ lancamentos.status !== 'PENDENTE' }
                        className="btn btn-success" 
                        onClick={e => props.alterarStatus(lancamentos, 'EFETIVADO')}>
                            <i className="pi pi-check"></i>
                    </button>
                    <button 
                        type="button" 
                        title="Cancelar"
                        disabled={ lancamentos.status !== 'PENDENTE' }
                        className="btn btn-warning" 
                        onClick={e => props.alterarStatus(lancamentos, 'CANCELADO')}>
                            <i className="pi pi-times"></i>
                    </button>
                    <button 
                        type="button" 
                        title="Editar"
                        className="btn btn-primary" 
                        onClick={e => props.editarAction(lancamentos.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button 
                        type="button" 
                        title="Deletar"
                        className="btn btn-danger" 
                        onClick={e => props.deletar(lancamentos)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}