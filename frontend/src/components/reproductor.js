import React from 'react';

function Start() {
    var data = localStorage.getItem('actualSong');

    const getSongById = fetch('/api/getCancionPorId/' + data).then(resp => resp.json()).then(data => { return data; });

    return(
        <div className="reproductor-div-static">
            <p>{"titulo"}</p>
            <audio loop controls src="https://firebasestorage.googleapis.com/v0/b/jossicstorage.appspot.com/o/songs%2FDaddy%20Yankee%20-%20Gasolina%20(Blasterjaxx%20Bootleg)%20%5BShort%20Edit%20Dimitri%20Vegas%20%26%20Like%20Mike%20Tomorrowland%202016%5D.mp3?alt=media&token=f2965dc1-56f9-4434-bda3-84823324254f" />
        </div>
    );
}
export default Start;