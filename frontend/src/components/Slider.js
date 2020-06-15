import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import '../App.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import slide1 from '../img/slide1.jpg';
import slide2 from '../img/slide2.jpg';

import mikislide from '../img/mikislide.jpg';
import daddy from '../img/daddyslider.jpg';

/* Reproductor */
import Start from './reproductor';

function CarouselInicio() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide1}
                    alt="First slide"
                />
                <Carousel.Caption className={"Caption-1"}>
                    <div className="background-slider-text">
                            <h3>¡Tu musica mas brillante que nunca!</h3>
                            <p>Muestra al mundo todo tu potencial a través de tus creaciones.</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide2}
                    alt="Second slide"
                />

                <Carousel.Caption className={"Caption-2"}>
                    <div className="background-slider-text">
                        <h3>Hazte Oír</h3>
                        <p>Consigue llegar a miles de usuarios con Jossic</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default function CarouselInicioLogin() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} className="carouselinicio">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={mikislide}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <Button variant="contained" onClick={function () { Start("5ee39c2d0af13784d58ad6ff")}}>Escuchar Canción</Button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={daddy}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    
                    <Button variant="contained" onClick={function () { Start("5ee39d8bd35b64f540f62b6d")}}>Escuchar Canción</Button>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export { CarouselInicio,CarouselInicioLogin }