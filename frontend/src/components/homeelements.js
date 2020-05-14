import '../../node_modules/aos/dist/aos.css';
import React from 'react';
import AOS from 'aos';
import {CarouselInicio} from './Slider';
import {CrearCuenta} from './Dialogs';

/* Imagenes */
import headphone from '../img/headphone.png';
import upload from '../img/upload.png';
import micro from '../img/micro.png';
import resposivefoto from '../img/resposive_foto.png';
import elivis from '../img/elvis.jpg';

class Carousel extends React.Component {
    constructor(props, context) {
        super(props, context);
        AOS.init({
            duration: 200,
        });
    }
    componentWillReceiveProps() {
        AOS.refresh();
    }
    render() {
        return (
            <div className="carousel-space-menu" data-aos="zoom-in">
                <CarouselInicio />
            </div>
        );
    }
}

class InfoSectionHome extends React.Component {
    constructor(props, context) {
        super(props, context);
        AOS.init({
            duration: 500,
        });
    }
    componentWillReceiveProps() {
        AOS.refresh();
    }
    render() {
        return (
            <div className="info-plataforma">
                <div data-aos="fade-right">
                    <img src={headphone}></img>
                    <p>¡Música sin límite!</p>
                </div>
                <span className="border-info" data-aos="fade-up"></span>
                <div data-aos="fade-right">
                    <img src={upload}></img>
                    <p>¡Subida Ilimitada!</p>
                </div>
                <span className="border-info" data-aos="fade-up"></span>
                <div data-aos="fade-right">
                    <img src={micro}></img>
                    <p>¡Artistas, este es vuestro lugar!</p>
                </div>
            </div>
        );
    }
}



class ResponsiveFoto extends React.Component {
    constructor(props, context) {
        super(props, context);
        AOS.init({
            duration: 2000,
        });
    }
    componentWillReceiveProps() {
        AOS.refresh();
    }
    render() {
        return (
            <div className="conatiner-responsive-home" >
                <div data-aos="fade-right">
                    <h2>¡Lleva tu musica contigo hayá donde quieras!</h2>
                </div>
                <div data-aos="fade-left">
                    <img src={resposivefoto} />
                </div>
            </div>
        );
    }
}

class ElvisFoto extends React.Component {
    constructor(props, context) {
        super(props, context);
        AOS.init({
            duration: 2000,
        });
    }
    componentWillReceiveProps() {
        AOS.refresh();
    }
    render() {
        return (
            <div className="conatiner-responsive-home" >
                <div data-aos="fade-right">
                    <img src={elivis} />
                </div>
                <div className="aling-text-elvis" data-aos="fade-down">
                    <h2>Como decia elvis presley.</h2>
                    <h3>"El ritmo es algo que se tiene o no se tiene"</h3>
                    <h2>Demuestra que tu tienes el ritmo mostrando tus dotes musicales al mundo</h2>
                </div>
            </div>
        );
    }
}

class LoginRegisHome extends React.Component {
    constructor(props, context) {
        super(props, context);
        AOS.init({
            duration: 2000,
        });
    }
    componentWillReceiveProps() {
        AOS.refresh();
    }
    render() {
        return (
            <div className="conatiner-loginregis-home" >
                <div>
                    <h2>A que sigues esperando inicia sesion ya, ¡es gratis!.</h2>
                    <div className="buttons-home-login">
                        <CrearCuenta/>
                    </div>
                </div>
            </div>
        );
    }
}

export { ResponsiveFoto, Carousel, InfoSectionHome, ElvisFoto, LoginRegisHome};