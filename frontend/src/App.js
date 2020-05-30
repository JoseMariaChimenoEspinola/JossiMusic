import React, { useState, useEffect, Suspense } from 'react';
import AudioPlayer from 'material-ui-audio-player';
import AOS from 'aos';

import Divider from '@material-ui/core/Divider';
import './App.css';
import { MenuHeader, MenuHeaderLoginSearch } from './components/Menu.js';
import ImageArtists from './components/avatars';
import { ResponsiveFoto, Carousel, InfoSectionHome, ElvisFoto, LoginRegisHome } from './components/homeelements.js';
import { CarouselInicioLogin } from './components/Slider';

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
            <p>Legal&nbsp;&nbsp;|&nbsp;&nbsp;Politica de privacidad&nbsp;&nbsp;|&nbsp;&nbsp;Quienes somos&nbsp;&nbsp;|&nbsp;&nbsp;Ayuda</p>
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
  }
  componentWillReceiveProps() {
    AOS.refresh();
  }
  render() {
    return (
      <div id="wrapper">
        <header>
          <MenuHeaderLoginSearch />
        </header>
        <div data-aos="fade-down">
          <section className="content">
            <CarouselInicioLogin />
            <Divider className="divider" />
            <section className="masescuchadas-inicio">
              <h2>Mas escuchadas (Top 5)</h2>
              {function () {
                let rows = [];
                for (let i = 0; i < 5; i++) {
                  rows.push(<div className="lista-inicio-best">
                    <AudioPlayer
                      controls
                      elevation={1}
                      width="100%"
                      variation="default"
                      spacing={3}
                      order="standart"
                      preload="auto"
                      src={"https://firebasestorage.googleapis.com/v0/b/jossicstorage.appspot.com/o/songs%2FDaddy%20Yankee%20-%20Gasolina%20(Blasterjaxx%20Bootleg)%20%5BShort%20Edit%20Dimitri%20Vegas%20%26%20Like%20Mike%20Tomorrowland%202016%5D.mp3?alt=media&token=f2965dc1-56f9-4434-bda3-84823324254f"}
                    />
                  </div>);
                }
                return rows;
              }()}
            </section>
          </section>
          
          <footer className="footer-style">
            <div className="footer-container-style">
              <h5>Localización:</h5>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23943.579565143267!2d2.1466909604869464!3d41.39694767283369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2620433a381%3A0x85f06b76506107d5!2smicroFusa%20Tienda%20Barcelona!5e0!3m2!1ses!2ses!4v1590833645079!5m2!1ses!2ses" width="250" height="200" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>

            <div className="footer-container-style">
              <h5>Politica de privacidad</h5>
              <ol>
                <li>Politica de privacidad</li>
                <li>Términos y condiciones de uso</li>
                <li>Politica de Local Storage</li>
              </ol>
            </div>

            <div className="footer-container-style">
              <h5>Contacto</h5>
              <p><span>Email:</span> <a href="mailto: josechu13048@gmail.com">josechu13048@gmail.com</a></p>
              <p><span>Telefono:</span> <a href="tel: 666898999">666898999</a></p>
            </div>
            
          </footer>
        </div>
      </div >);
  }
}

export { Home, HomeLogin };
