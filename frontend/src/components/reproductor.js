import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

function Start(id) {
    var list = new Array;
    var artista;

    fetch('/api/getCancionPorId/' + id).then(resp => resp.json()).then(data => {
        list.push(data);
        fetch('/api/getDataUser/' + data['artista'], {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json()).then(data => {
            artista = data;
        });
    });

    
    
    console.log(artista);
    setTimeout(() => {
        
        setTimeout(() => {
            if (list[0] == null) {
                document.getElementsByClassName('titulo-reproductor')[0].innerHTML = "Busca una cancion";
            } else {
                document.getElementsByClassName('caratula-preview-reproductor')[0].setAttribute("src", list[0].dircaratula);
                document.getElementsByClassName('titulo-reproductor')[0].innerHTML = list[0].titulo;
                document.getElementsByClassName('artista-reproductor')[0].innerHTML = artista['usuario'];
                document.getElementsByClassName('genero-reproductor')[0].innerHTML = list[0].genero;
                document.getElementById('audio-player').setAttribute('src', list[0].dircancion);
                document.getElementById('audio-player').play();
                document.getElementsByClassName('remove-song-reproductor')[0].style.display = "block";
            }

        }, 100);
    }, 50);

    function removeSong() {
        document.getElementsByClassName('titulo-reproductor')[0].innerHTML = "Busca una cancion";
        document.getElementsByClassName('caratula-preview-reproductor')[0].removeAttribute("src");
        document.getElementsByClassName('artista-reproductor')[0].innerHTML = "";
        document.getElementsByClassName('genero-reproductor')[0].innerHTML = "";
        document.getElementById('audio-player').setAttribute('src', "");
        document.getElementsByClassName('remove-song-reproductor')[0].style.display = "none";
    }

    
    function returnData() {
        return (
            <div>
                <div className="reproductor-div-static">
                    <img className="caratula-preview-reproductor" />
                    <div className="data-song-rep">
                        <p className="titulo-reproductor"></p>
                        <p className="artista-reproductor"></p>
                        <p className="genero-reproductor"></p>
                    </div>
                    <audio id="audio-player" controls />
                    <h6 onClick={removeSong}><CloseIcon className="remove-song-reproductor" /></h6>
                </div>
            </div>);
    }

    return returnData();
}


export default Start;