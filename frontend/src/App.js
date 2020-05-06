import React, {useState,useEffect, Suspense} from 'react';
import './App.css';
import MenuHeader from './files/Menu.js';
import ImageArtists from './files/avatars';
import { ResponsiveFoto, Carousel, InfoSectionHome, ElvisFoto, LoginRegisHome} from './files/homeelements.js';
/* Imagenes */

class Home extends React.Component {
  render() {


    return (
      
      <div id="wrapper">
        <header>
          <MenuHeader />
        </header>
        <section className="content">
          <Carousel/>
          <InfoSectionHome/>
          <div className="conatiner-artists-home">
          <h2>Sumate a una comunidad de artistas diversa, atractiva y divertida </h2>
            <div className="container-artist-home">
              <ImageArtists />
            </div>
          </div>
          <ResponsiveFoto/>
          <ElvisFoto/>
          <LoginRegisHome/>
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

export default Home;
