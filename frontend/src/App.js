import React, {useState,useEffect, Suspense} from 'react';
import './App.css';
import { MenuHeader, MenuHeaderLoginSearch} from './components/Menu.js';
import ImageArtists from './components/avatars';
import { ResponsiveFoto, Carousel, InfoSectionHome, ElvisFoto, LoginRegisHome} from './components/homeelements.js';

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

class HomeLogin extends React.Component{
  
  render(){
    return(
    <div id="wrapper">
      <header>
          <MenuHeaderLoginSearch />
      </header>
      </div>);
  }
}

export {Home, HomeLogin};
