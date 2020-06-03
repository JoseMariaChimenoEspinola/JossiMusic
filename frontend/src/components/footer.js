
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer(){
    return (
        <footer className="footer-style">
            <div className="footer-container-style">
                <h5>Localización:</h5>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23943.579565143267!2d2.1466909604869464!3d41.39694767283369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2620433a381%3A0x85f06b76506107d5!2smicroFusa%20Tienda%20Barcelona!5e0!3m2!1ses!2ses!4v1590833645079!5m2!1ses!2ses" width="250" height="200" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>

            <div className="footer-container-style">
                <h5>Politica de privacidad</h5>
                <ol>
                    <NavLink className="link-menu-extra-options" to={"/politicadeprivacidad"}><li>Politica de privacidad</li></NavLink>
                    <NavLink className="link-menu-extra-options" to={"/localstorage"}><li>Politica de Local Storage</li></NavLink>
                </ol>
            </div>

            <div className="footer-container-style">
                <h5>Contacto</h5>
                <p><span>Email:</span> <a href="mailto: josechu13048@gmail.com">josechu13048@gmail.com</a></p>
                <p><span>Telefono:</span> <a href="tel: 666898999">666898999</a></p>
            </div>

        </footer>
    );
}