import React, {useState} from 'react';
import '../App.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import slide1 from '../img/slide1.jpg';
import slide2 from '../img/slide2.jpg';


export default function CarouselInicio() {
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