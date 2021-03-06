import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Start from './reproductor';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';

import logo from '../img/logo.png';

import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { LoginDialog } from './Dialogs';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
/* Grids */
import GridList from '@material-ui/core/GridList';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'block',
        },
    },
    titleMobile: {
        display: 'none',
        [theme.breakpoints.down('md')]: {
            display: 'block',
            width: "30px",
            height: "30px"
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function MenuHeader() {
    return (
        <AppBar position="static">
            <Toolbar>
                {/*<MenuOpciones/>*/}
                <Typography variant="h6" className={useStyles.title}>
                    <img src={logo} className="logo-menu" />
                </Typography>
                <LoginDialog />
            </Toolbar>
        </AppBar>
    );
}

function MenuHeaderLoginSearch() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [usuario, setUsuario] = useState('');
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    fetch('/api/getDataUser/' + localStorage.getItem('usuario'), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(resp => resp.json()).then(data => {
        setUsuario(data['usuario']);
    });

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <NavLink className="link-menu-extra-options" to={"/perfil"}><MenuItem onClick={handleMenuClose}>Perfil, {usuario}</MenuItem></NavLink>
            <NavLink className="link-menu-extra-options" to={"/configuration"}><MenuItem onClick={handleMenuClose}>Configuracion de cuenta</MenuItem></NavLink>
            <NavLink className="link-menu-extra-options" to="/" onClick={() => { localStorage.clear(); window.location.reload(false);}}><MenuItem>Cerrar sesión</MenuItem></NavLink>
        </Menu>

    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <MoreVertIcon />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );


    /* Filters */
    const [songscheck, setSongCheck] = useState(true);
    function hideShowSongs(event) {
        setSongCheck(event.target.checked);
        { songscheck == true ? document.getElementById('canciones').style.display = "none" : document.getElementById('canciones').style.display = "flex" }
        { songscheck == true ? document.getElementById('titulo-canciones').style.display = "none" : document.getElementById('titulo-canciones').style.display = "flex" }
        { songscheck == true ? document.getElementsByClassName('container-grids-songs')[0].style.height = "0px" : document.getElementsByClassName('container-grids-songs')[0].style.height = "250px" }
    }

    const [artistcheck, setArtistCheck] = useState(true);
    function hideShowArtists(event) {
        setArtistCheck(event.target.checked);
        { artistcheck == true ? document.getElementById('artistas').style.display = "none" : document.getElementById('artistas').style.display = "flex" }
        { artistcheck == true ? document.getElementById('titulo-artistas').style.display = "none" : document.getElementById('titulo-artistas').style.display = "flex" }
        { artistcheck == true ? document.getElementsByClassName('container-grids-artists')[0].style.height = "0px" : document.getElementsByClassName('container-grids-artists')[0].style.height = "250px" }
    }

    async function showBuscador() {
        var songs = "";
        var artists = "";
        var value = document.getElementById('text-input-buscador').value;

        var canciones = new Array;
        var call = await fetch('/api/getCancionBuscador/' + value).then(resp => resp.json()).then(data => {
            if (data.length != 0) {
                for (let x of data) {
                    canciones.push(x);
                }
                return 'ok'
            } else { return 'false' }
        });

        var artistas = new Array;
        var call2 = await fetch('/api/getArtistaBuscador/' + value).then(resp => resp.json()).then(data => {
            if (data.length != 0) {
                for (let x of data) {
                    artistas.push(x);
                }
                return 'ok'
            } else { return 'false' }
        });

        /* Comprueba si hay resultados de las llamadas o no, si hay, mostrara el buscado, si no, no. */
        if (call == 'ok' || call2 == 'ok') {
            document.getElementById('buscador').setAttribute("class", "style-searcher-content-selected");
            document.getElementById('form-buscador').style.display = "block";

            /* Oculta las diferentes opciones del buscador progresivamente, de tal manera que cuando el usuario escriba algo,
             muestre unicamente lo que se encuentre, si no hay canciones con estos resultados, el especio desaparecera */
            if (canciones.length != 0) {
                if (songscheck == true) {
                    for (var i = 0; i < canciones.length; i++) {
                        var id = canciones[i]._id;
                        var titulo = canciones[i].titulo;
                        var url = canciones[i].dircancion;
                        document.getElementsByClassName('container-grids-songs')[0].style.height = "250px"
                        document.getElementById('titulo-canciones').style.display = "block"

                        songs += '<div class="div-contenedor-resultados">';
                        songs += '<a value="' + id + '" class="link-song" id="link-song-' + i + '"><img class="foto-contenedor-resultados" src="' + canciones[i].dircaratula + '"></img>';
                        songs += '<p><span>' + titulo + '<span></p>';
                        songs += '<p>' + canciones[i].artista + '</p></a>';
                        songs += '<a href="/cancion?song=' + canciones[i]._id + '"><Button class="button-songs">Ver Mas</Button></a>';
                        songs += '</div>';

                        document.getElementById('canciones').innerHTML = songs;

                    }
                    for (var i = 0; i < canciones.length; i++) {
                        (function (i) {
                            var id = canciones[i]._id;
                            document.getElementById('link-song-' + i).onclick = function () { Start(id) };
                        })(i);
                    }
                }
            } else {
                document.getElementById('canciones').innerHTML = "<h5>No hay resultados</h5>";
                document.getElementsByClassName('container-grids-songs')[0].style.height = "0%";
            }




            if (artistas.length != 0) {
                if (artistcheck == true) {
                    for (var i = 0; i < artistas.length; i++) {
                        document.getElementsByClassName('container-grids-artists')[0].style.height = "250px";
                        document.getElementById('titulo-artistas').style.display = "block";

                        artists += '<div class="div-contenedor-resultados">';
                        artists += '<img class="foto-contenedor-resultados" src="' + artistas[i].foto + '"></img>';
                        artists += '<p><span>' + artistas[i].usuario + '<span></p>';
                        artists += '<a href="/perfilext?artist=' + artistas[i]._id + '"><Button class="button-songs">Ver Mas</Button></a>';
                        artists += '</div>';
                        document.getElementById('artistas').innerHTML = artists;
                    }
                }

            } else {
                document.getElementById('artistas').innerHTML = "<h5>No hay artistas con este nombre</h5>";
                document.getElementsByClassName('container-grids-artists')[0].style.height = "0px"
            }


        } else {
            /* Permite ocultar todo el buscador en caso de que no exista ningun restultado */
            document.getElementById('buscador').setAttribute("class", "style-searcher-content");
            document.getElementById('form-buscador').style.display = "none";
            document.getElementById('canciones').innerHTML = "";
            document.getElementById('artistas').innerHTML = "";
        }
    }

    function closeSearcher() {
        document.getElementById('buscador').setAttribute("class", "style-searcher-content");
        document.getElementById('form-buscador').style.display = "none";
        document.getElementById('canciones').innerHTML = "";
        document.getElementById('artistas').innerHTML = "";
    }


    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>

                    <Typography className={classes.title} variant="h6" noWrap>
                        <NavLink to="/"><img src={logo} className="logo-menu" /></NavLink>
                    </Typography>
                    <NavLink to="/"><img className={classes.titleMobile} src="https://firebasestorage.googleapis.com/v0/b/jossicstorage.appspot.com/o/icon.png?alt=media&token=708d784a-3308-4b35-bcbd-16cbdf351179" /></NavLink>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            id="text-input-buscador"
                            inputProps={{ 'aria-label': 'search' }}
                            onInput={showBuscador}
                        /><Button variant="contained" color="primary" onClick={showBuscador} className="hide-button-mobile">Buscar</Button>
                    </div>
                    <div className={classes.grow} />
                    <NavLink to={"/uploadcontent"}><Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}
                    >
                        Subir
                    </Button></NavLink>
                    <div className={classes.sectionDesktop}>

                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <div id="buscador" className="style-searcher-content">
                <div className="data-buscador-container">
                    <div id="form-buscador">
                        <div className="icons-searcher">
                            <Button variant="contained" color="secondary" onClick={closeSearcher}>Cerrar</Button>
                        </div>
                        <h1 id="titulo-buscador"></h1>
                        <h4>Filtros:</h4>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                    onChange={hideShowSongs}
                                    checked={songscheck}
                                />
                            }
                            label="Canciones"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                    onChange={hideShowArtists}
                                    checked={artistcheck}
                                />
                            }
                            label="Artistas"
                        />
                        <Divider /><br></br>
                        <h6>Resultados:</h6>
                        <h2 id="titulo-canciones">Canciones</h2>
                        <div className="container-grids-songs">
                            <GridList className={"gridlist"} cols={2.5}>
                                <div id="canciones"></div>
                            </GridList>
                        </div>

                        <h2 id="titulo-artistas">Artistas</h2>
                        <div className="container-grids-artists">
                            <GridList className={"gridlist"} cols={2.5}>
                                <div id="artistas"></div>
                            </GridList>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}


export { MenuHeader, MenuHeaderLoginSearch };
