import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class EditarProduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: {
                produto: "",
                quantidade: "",
                dataVencimento: ""
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
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}${id}`) 
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ usuario: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/produto" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Produto</legend>
                        <div classProduto="produto-update">
                            <label htmlFor="produto"> Produto </label>
                            <br />
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
                        <div classProduto="produto-update">
                            <label htmlFor="quantidade">Quantidade </label>
                            <br />
                            <input
                                type="text"
                                id="quantidade"
                                name="quantidade"
                                placeholder="Quantidade"
                                min="1"
                                max="99999"
                                required
                                value={this.state.produto.quantidade}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div classProduto="produto-update">
                            <label htmlFor="dataVencimento">Data de Vencimento </label>
                            <br />
                            <input
                                type="text"
                                id="datavencimento"
                                name="dataVencimento"
                                placeholder="dataVencimento"
                                required
                                value={this.state.produto.dataVencimento}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <button type="submit" classProduto="btn btn-primary">
                            Atualizar
                    </button>
                    </fieldset>
                </form>
            );
        }
    }
 
 
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.produto;
        const value = target.value;
 
        this.setState(prevState => ({
            produto: { ...prevState.produto, [name]: value }
        }));
    };
 
    handleSubmit = event => {
        const { id } = this.state.produto;
 
        fetch(`${process.env.REACT_APP_API_URL}${id}`, {
            method: "put",
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
 
export default EditarProduto;
