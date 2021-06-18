import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produto } = this.state;
 
        return (
            <div classProduto="produto-list">
                <Link to={`/criarproduto`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                <br /><br />
 
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Produto</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Vencimento</th>
                            <th scope="col">Ativo</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produto.map((produto, index) => (
                            <tr>
                                <th scope="row">{produto.id}</th>
                                <td>{produto.produto}</td>
                                <td>{produto.quantidade.toLocaleString('pt-BR')}</td>
                                <td>{new Date(produto.dataVencimento).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                                <td>{produto.ativo ? "Sim" : "Não"}</td>
                                <td> <Link to={`/produto/${produto.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarproduto/${produto.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarproduto/${produto.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
