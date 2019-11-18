import React, { Component } from 'react';
import Footer from '../../componentes/Footer/Footer';

// Import da biblioteca Material Design Bootstrap React
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
// import { Link } from 'react-router-dom';

class Categorias extends Component {

  // Usado para criar nossos states
  constructor() {
    // Usado para poder manipular os States, que são herdados de Component
    super();

    this.state = {
      // definimos uma lista incial
      lista: [],

      // Pegamos input do form de Cadastro
      nome: "",

      // MDB
      modal: false,

      // Usamos para armazenar os dados a serem alterados
      editarModal: {
        categoriaId: "",
        titulo: ""
      }
    }

    // Damos o bind quando não usamos arrow function
    this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  UNSAFE_componentWillMount() {
    document.title = this.props.titulo_pagina;
    console.log("Carregando");
  }

  componentDidMount() {
    console.log("Carregado");
    console.log(this.state.lista);
    this.listaAtualizada();
  }

  componentDidUpdate() {
    console.log("Atualizando");
  }

  componentWillUnmount() {
    console.log("Saindo");
  }

  // GET - listar
  listaAtualizada = () => {
    fetch("http://localhost:5000/api/categoria")
      .then(response => response.json())
      .then(data => this.setState({ lista: data }))
  }

  // POST - Cadastrar
  cadastrarCategoria(event) {
    // Impede que a página seja recarregada
    event.preventDefault();

    console.log("Cadastrando");
    console.log(this.state.nome);

    fetch("http://localhost:5000/api/categoria", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({ titulo : this.state.nome })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.listaAtualizada();
      })
      .catch(error => console.log(error))

  }

  // DELETE - Delete categoria
  deletarCategoria = (id) => {
    
    console.log("Excluindo");

    fetch("http://localhost:5000/api/categoria/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.listaAtualizada();
      })
      .catch(error => console.log(error))
  }

  // Acionado quando clicamos no botão Editar para capturar
  // e salvr no state os dados atuais
  alterarCategoria = (categoria) => {
    console.log(categoria);


    this.setState({
      editarModal: {
        categoria: categoria.categoriaId,
        titulo: categoria.titulo
      }
    })

    //abrir modal
    this.toggle();
  }

  // UPDATE - atualiza a categoria
  salvarAlteracoes = (event) => {
    // Previne que a pagina seja recarregada
    event.preventDefault();

    fetch("http://localhost:5000/api/categoria/" + this.state.editarModal.categoriaId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.editarModal)
    })
      .then(response => response.json())
      .catch(error => console.log(error))

      // Atraso na requiseção, pois as requests possuem intervalos muito proximos
      setTimeout(() => {
        this.listaAtualizada();
      }, 1000);
    
      //Fechar modal
      this.toggle();
  }

  // Ultilizamos para poder alterar o input de cadastro
  atualizaNome(input) {
    this.setState({ nome: input.target.value })
  }

  // Ultilozamos para atualizar os states dos inputs dentro do modal
  atualizaEditarModalTitulo(input) {
    this.setState({
      editarModal: {
        categoriaId: this.state.editarModal.categoriaId,
        titulo: input.target.value
      }
    })
  }

  render() {

    let instituicao = "SENAI";

    return (
      <div>
        <main className="conteudoPrincipal">
          {/* <Link to="/">Voltar</Link> */}
          <section className="conteudoPrincipal-cadastro">
            <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
            <div className="container" id="conteudoPrincipal-lista">
              <table id="tabela-lista">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Título</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody id="tabela-lista-corpo">
                  {
                    // Percorrer a lista de Categorias
                    this.state.lista.map(function(categoria){
                      return (
                        // Colocamos uma "Key" pois cada linha em JSx Precisa de um ID único
                        <tr key={categoria.categoriaId}>
                          <td>{categoria.categoriaId}</td>
                          <td>{categoria.titulo}</td>
                          <td>
                            <button onClick={e => this.alterarCategoria(categoria)}>Alterar</button>
                            <button onClick={e => this.deletarCategoria(categoria.categoriaId)}>Excluir</button>
                          </td>
                        </tr>
                      )
                    // usamos para vinclular todo o context do map
                    }.bind(this))
                  }
                </tbody>
              </table>
            </div>

            <div className="container" id="conteudoPrincipal-cadastro">
              <h2 className="conteudoPrincipal-cadastro-titulo">
                Cadastrar Tipo de Evento
            </h2>
              <form onSubmit={this.cadastrarCategoria}>
                <div className="container">
                  <input
                    type="text"
                    id="nome-tipo-evento"
                    placeholder="tipo do evento"
                    value={this.state.nome}
                    onChange={this.atualizaNome.bind(this)}
                  />
                  <button
                    className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                  >
                    Cadastrar
                </button>
                </div>
              </form>

              {/* Utilizamos o modal da Biblioteca para fazer o UPDATE */}
              <MDBContainer>
                {/* Abraçamos os inputs do conteiner com um form */}
                <form onSubmit={this.salvarAlteracoes}>
                  <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Editar - {this.state.editarModal.titulo}</MDBModalHeader>
                    <MDBModalBody>
                      <MDBInput
                        label="Categoria"
                        value={this.state.editarModal.titulo}
                        onChange={this.atualizaEditarModalTitulo.bind(this)}
                      />
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                      {/* Incluimos o tipo Submit no botão para enviar o formulario */}
                      <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>
                </form>
              </MDBContainer>

            </div>
          </section>
        </main>
        <Footer escola={instituicao} />
      </div>
    );
  }
}
export default Categorias;

