import React, { useState, useEffect, Suspense } from 'react';
import ReactDOM from "react-dom";
import ReactDOMServer from 'react-dom/server';
import AOS from 'aos';

import { BrowserRouter, Link, NavLink } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import './App.css';
import { MenuHeader, MenuHeaderLoginSearch } from './components/Menu.js';
import ImageArtists from './components/avatars';
import { ResponsiveFoto, Carousel, InfoSectionHome, ElvisFoto, LoginRegisHome } from './components/homeelements.js';
import { CarouselInicioLogin } from './components/Slider';
import Footer from './components/footer';


import GridList from '@material-ui/core/GridList';

/* Reproductor */
import Start from './components/reproductor';
import { Button } from '@material-ui/core';

class Home extends React.Component {
  render() {


    return (

      <div id="wrapper">
        <header>
          <MenuHeader />
        </header>
        <section className="content">
          <Carousel />
          <InfoSectionHome />
          <div className="conatiner-artists-home">
            <h2>Sumate a una comunidad de artistas diversa, atractiva y divertida </h2>
            <div className="container-artist-home">
              <ImageArtists />
            </div>
          </div>
          <ResponsiveFoto />
          <ElvisFoto />
          <LoginRegisHome />
        </section>
        <footer>
          <div className="footer-container">
            <p>© 2020 JossicMusic</p>
          </div>
        </footer>
      </div>

    );
  }
}

class HomeLogin extends React.Component {
  constructor(props, context) {
    super(props, context);
    AOS.init({
      duration: 1200,
    });
    this.state = { "gen": "" };
  }

  componentWillReceiveProps() {
    AOS.refresh();
  }

  render() {
    // comprueba el genero actual
    var gen;
    var listStyle = new Array;
    var listStyleArtists = new Array;

    function checkGen() {
      fetch('/api/checkStyleMusic/' + localStorage.getItem('usuario')).then(resp => resp.json()).then(data => gen = data['genero']);
      setTimeout(() => {
        document.getElementsByClassName('style-selected-home')[0].innerHTML = gen;
      }, 300);
    }

    setTimeout(() => {
      checkGen();
    }, 200);
    //Get canciones en home

    setTimeout(function () {
      fetch('/api/getMusicStyleHome/' + gen).then(resp => resp.json()).then(data => {
        for (let x of data) {
          listStyle.push(x);
        }
      });

      setTimeout(function () {
        var data = "";

        if (listStyle.length != 0) {
          for (var i = 0; i < listStyle.length; i++) {
            data += '<div class="div-contenedor-resultados">';
            data += '<a value="' + listStyle[i]._id + '" class="link-song" id="link-song-' + i + '"><img class="foto-contenedor-resultados" src="' + listStyle[i].dircaratula + '"></img>';
            data += '<p>' + listStyle[i].titulo + '</p>';
            data += '<p>' + listStyle[i].genero + '</p>';
            data += '<p>' + listStyle[i].fecha + '</p></a>';
            data += '<a href="/cancion?song=' + listStyle[i]._id + '"><Button class="button-songs">Ver Mas</Button></a>';
            data += '</div>';
            document.getElementById('songs-style-home').innerHTML = data;
          }
          for (var i = 0; i < listStyle.length; i++) {
            (function (i) {
              var id = listStyle[i]._id;
              document.getElementById('link-song-' + i).onclick = function (event) { event.preventDefault(); Start(id) };
            })(i);
          }
        } else {
          document.getElementById('songs-style-home').innerHTML = "¿Vaya!, no hay contenido con este estilo.";
        }


      }, 900);
    }, 800);

    //Get artista en home
    setTimeout(function () {
      fetch('/api/getArtistsStyleHome/' + gen).then(resp => resp.json()).then(data => {
        for (let x of data) {
          listStyleArtists.push(x);
        }
      });

      setTimeout(function () {
        var data = "";

        if (listStyleArtists.length != 0) {
          for (var i = 0; i < listStyleArtists.length; i++) {
              data += '<div class="div-contenedor-resultados">';
              data += '<img class="foto-contenedor-resultados" src="' + listStyleArtists[i].foto + '"></img>';
              data += '<p>' + listStyleArtists[i].usuario + '</p>';
              data += '<p>' + listStyleArtists[i].genero + '</p>';
              data += '<a href="/perfilext?artist=' + listStyleArtists[i]._id + '"><Button class="button-songs">Descubrir</Button></a>';
              data += '</div>';
              document.getElementById('artists-style-home').innerHTML = data;
            
          }
        } else {
          document.getElementById('artists-style-home').innerHTML = "¿Vaya!, no hay artistas con este estilo.";
        }


      }, 900);
    }, 800);


    return (
      <div id="wrapper">
        <header>
          <MenuHeaderLoginSearch />
        </header>
        <div data-aos="fade-down">
          <section className="content">
            <CarouselInicioLogin />
            <Divider className="divider" />
            <section className="estilo-inicio">
              <h2>Novedades de <span className="style-selected-home"></span></h2>
              <Divider /><br></br>
              <h3 className="titulo-cancion-detalles">Canciones</h3>
              <GridList cols={3}>
                <div id="songs-style-home"></div>
              </GridList>
              <h3 className="titulo-cancion-detalles">Artistas</h3>
              <GridList cols={3}>
                <div id="artists-style-home"></div>
              </GridList>
            </section>
          </section>

          <Footer />
        </div>
      </div >);
  }
}

export { Home, HomeLogin };
