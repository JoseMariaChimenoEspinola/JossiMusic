import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ww from '../img/ww.jpg';
import miki from '../img/miki.jpg';
import daddy from '../img/daddy.jpg';
import pera from '../img/perales.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function ImageArtists() {
    const classes = useStyles();

    return (
        <div className={classes.root, "avatars"}>
            <div className="container-avatar-text">
                <Avatar alt="W&W" src={ww} />
                <h5>W&W</h5>
                <h6>DJs</h6>
            </div>
            <div className="container-avatar-text">
                <Avatar alt="Miki Núñéz" src={miki} />
                <h5>Miki Núñéz</h5>
                <h6>Cantante</h6>
            </div>
            <div className="container-avatar-text">
                <Avatar alt="Daddy Yankee" src={daddy} />
                <h5>Daddy Yankee</h5>
                <h6>Cantante</h6>
            </div>
            <div className="container-avatar-text">
                <Avatar alt="Jose Luis Perales" src={pera} />
                <h5>Jose Luis Perales</h5>
                <h6>Compositor</h6>
            </div>
        </div>
    );
}

