import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Cliente extends Component {
    state = {
        produto: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`https://backend-cadastroproduto.herokuapp.com/produto/${id}`)
            .then(cliente =>
                cliente.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produto, index } = this.state;
 
        if (produto.ativo) {
            produto.ativo = "Produto Ativo";
        } else {
            produto.ativo = "Produto Inativo";
        }
 
        return (
            <div className="produto-info">
                <h1> {produto.produto} </h1>
                <h1> {produto.ativo} </h1>
                <h1> {produto.quantidade} </h1>
                <h1> {produto.dataVencimento} </h1>
                <br />
                <Link to={`/produto`}> Voltar </Link> <br />
                <Link to={`/editarproduto/${produto.id}`}> Editar </Link> <br />
                <Link to={`/deletarproduto/${produto.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}
