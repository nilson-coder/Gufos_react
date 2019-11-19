import React, { Component } from 'react';
import Footer from '../../componentes/Footer/Footer';

class Eventos extends Component {
  constructor() {
    super();
    this.state = {
      lista: [],
      nome: "",
      acessoLivre: "",
      TipoEvento:""
    }
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
    fetch("http://localhost:5000/api/evento")
      .then(response => response.json())
      .then(data => this.setState({ lista: data }))
  }


  render() {

    return (
      <div>
        <main className="conteudoPrincipal">
          <section className="conteudoPrincipal-cadastro">
            <h1 className="conteudoPrincipal-cadastro-titulo">Eventos</h1>
            <div className="container" id="conteudoPrincipal-lista">
              <table id="tabela-lista">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Evento</th>
                    <th>Data</th>
                    <th>Acesso Livre</th>
                    <th>Tipo do Evento</th>
                  </tr>
                </thead>

                <tbody id="tabela-lista-corpo">
                  {
                    this.state.lista.map(function (evento) {
                      return (
                        <tr key={evento.eventoId}>
                          <td>{evento.eventoId}</td>
                          <td>{evento.titulo}</td>
                          <td>{evento.dataEvento}</td>
                          <td>{evento ? 'livre' : 'Restrito'}</td>
                          
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>

            <div className="container" id="conteudoPrincipal-cadastro">
              <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
              <div className="container">
                <input
                  type="text"
                  id="evento__titulo"
                  placeholder="título do evento"
                />
                <input type="text" id="evento__data" placeholder="dd/MM/yyyy" />
                <select id="option__acessolivre">
                  <option value="1">Livre</option>
                  <option value="0">Restrito</option>
                </select>
                <select id="option__tipoevento">
                  <option value="0" disabled>Tipo do Evento</option>
                </select>
                <textarea
                  rows="3"
                  cols="50"
                  placeholder="descrição do evento"
                  id="evento__descricao"
                ></textarea>
              </div>
              <button
                className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                onclick="cadastrarEvento()"
              >
                Cadastrar
          </button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}
export default Eventos;

