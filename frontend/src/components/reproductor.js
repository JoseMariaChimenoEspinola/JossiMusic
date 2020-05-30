import React, { useState } from 'react';

function Start(id) {
    var list = new Array;


    fetch('/api/getCancionPorId/' + id).then(resp => resp.json()).then(data => {
        list.push(data);
    });

    setTimeout(() => {
        setTimeout(() => {
            if (list[0] == null) {
                document.getElementsByClassName('titulo-reproductor')[0].innerHTML = "Busca una cancion";
            } else {
                document.getElementsByClassName('caratula-preview-reproductor')[0].setAttribute("src", list[0].dircancion);
                document.getElementsByClassName('titulo-reproductor')[0].innerHTML = list[0].titulo;
                document.getElementsByClassName('artista-reproductor')[0].innerHTML = list[0].artista;
                document.getElementsByClassName('genero-reproductor')[0].innerHTML = list[0].genero;
                document.getElementById('audio-player').setAttribute('src', list[0].dircancion);
                document.getElementById('audio-player').play();
            }

        }, 100);
    }, 50);

    function returnData() {
        return (
            <div className="reproductor-div-static">
                <img className="caratula-preview-reproductor" />
                <div className="data-song-rep">
                    <p className="titulo-reproductor"></p>
                    <p className="artista-reproductor"></p>
                    <p className="genero-reproductor"></p>
                </div>
                <audio id="audio-player" controls />
            </div>);
    }

    return returnData();
}


export default Start;