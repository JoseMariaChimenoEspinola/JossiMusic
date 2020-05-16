import React, {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AudioPlayer from 'material-ui-audio-player';

import { MenuHeaderLoginSearch } from './Menu';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';

function ProfileUser() {
    var artista = localStorage.getItem('usuario');
    var list = [];

    const checkUserApi = async () => {
        const res = await fetch('/api/getMusic/' + artista).then(resp => resp.json());
        Promise.all(res).then(data => {
            for(let i = 0;i<data.length;i++){
                list.push(data[i]);
            }
        });
      console.log(res[0]);
    }

    useEffect(() => {
      checkUserApi();
    });

    const likes = 0;
    var subs = 0;

    async function addLike() {
      likes = likes +1;
    }

    return (
      <div id="wrapper">
        <header>
          <MenuHeaderLoginSearch />
        </header>
        <section className="content">
          <div className="profile-style-container">
            <div className="container-likes-counter">
              <h1>{likes} Likes</h1>
              <ThumbUpIcon id="like" onClick={addLike}/>
            </div>
            <div className="container-avatar-text">
              <input
                accept="image/*"
                id="contained-button-file"
                className="hideInput"
                type="file"
              />
              <label htmlFor="contained-button-file"><Avatar alt={localStorage.getItem('usuario')} className="hoverAvatar" /></label>
              <h5>{localStorage.getItem('usuario')}</h5>
              <h6>DJs</h6>
            </div>
            <div className="container-subs-counter">
              <h1>{subs} seguidores</h1>
              <Button variant="contained" color="primary">
                Seguir
              </Button>
            </div>
          </div>
          <div className="profile-style-container">
              <h1>Ultimas subidas</h1>
          </div>
        </section>
      </div>
    );
  }

export default ProfileUser;
