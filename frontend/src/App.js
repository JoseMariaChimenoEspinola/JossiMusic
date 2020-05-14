import React, {useState,useEffect, Suspense} from 'react';
import AudioPlayer from 'material-ui-audio-player';

import Divider from '@material-ui/core/Divider';
import './App.css';
import { MenuHeader, MenuHeaderLoginSearch} from './components/Menu.js';
import ImageArtists from './components/avatars';
import { ResponsiveFoto, Carousel, InfoSectionHome, ElvisFoto, LoginRegisHome} from './components/homeelements.js';
import { CarouselInicioLogin } from './components/Slider';

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
      <section className="content">
          <CarouselInicioLogin />
          <Divider className="divider"/>
          <section className="masescuchadas-inicio">
            <h2>Mas escuchadas (Top 5)</h2>
            {function () {
              let rows = [];
              for (let i = 0; i < 5; i++){
                rows.push(<div className="lista-inicio-best">
                  <AudioPlayer
                    controls
                    elevation={1}
                    width="100%"
                    variation="default"
                    spacing={3}
                    download={true}
                    order="standart"
                    preload="auto"
                    src={"https://firebasestorage.googleapis.com/v0/b/jossicstorage.appspot.com/o/songs%2FDaddy%20Yankee%20-%20Gasolina%20(Blasterjaxx%20Bootleg)%20%5BShort%20Edit%20Dimitri%20Vegas%20%26%20Like%20Mike%20Tomorrowland%202016%5D.mp3?alt=media&token=f2965dc1-56f9-4434-bda3-84823324254f"}
                  />
                </div>);
                }
                return rows;
              }() }
          </section>
      </section>
      </div>);
  }
}

class ProfileUser extends React.Component{
  render(){
    return 0;
  }
}

export {Home, HomeLogin};
