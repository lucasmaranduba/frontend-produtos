import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class CriarProduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: {
                produto: "",
                quantidade: "",
                dataVencimento: "",
                ativo: "true"
            },
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div classProduto="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/produto" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Usuário</legend>
                        <div classProduto="produto-insert">
                            <label htmlFor="produto">Produto </label>
                            <br/>
                            <input
                                type="text"
                                id="produto"
                                name="produto"
                                placeholder="Produto"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.produto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div classProduto="produto-insert">
                            <label htmlFor="quantidade">Quantiade</label>
                            <br />
                            <input
                                type="text"
                                id="quantidade"
                                name="quantidade"
                                placeholder="Quantidade"
                                required
                                value={this.state.produto.produto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div classProduto="produto-insert">
                            <label htmlFor="dataVencimento">Data de Vencimento </label>
                            <br />
                            <input
                                type="date"
                                id="dataVencimento"
                                name="dataVencimento"
                                placeholder="Data de Vencimento"
                                required
                                value={this.state.produto.dataVencimento}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <div classProduto="produto-insert">
                            <label>
                                <input
                                    type="radio"
                                    name="ativo"
                                    value="true"
                                    checked={this.state.produto.ativo === "true"}
                                    onChange={this.handleInputChange}
                                />
                                Ativo
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="false"
                                    name="ativo"
                                    checked={this.state.produto.ativo === "false"}
                                    onChange={this.handleInputChange}
                                />
                                Inativo
                        </label>
                        </div>
 
 
                        <button type="submit" classProduto="btn btn-primary">
                            Cadastrar
                    </button>
                    </fieldset>
                </form>
            );
        }
    }
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            produto: { ...prevState.produto, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}`, {
            method: "post",
            body: JSON.stringify(this.state.produto),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default CriarProduto;
