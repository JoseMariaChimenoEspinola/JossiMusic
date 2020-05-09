import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { MenuHeaderLoginSearch } from './Menu';

const muiTheme = createMuiTheme({});

const useStyles = makeStyles((theme) => ({
    root:{
        position: "absolute",
        top: "130px",
        left: "300px",
        right: "300px",
        border: "1px solid grey",
        borderRadius: "15px",
        padding: "65px",
        display: "flex",
        justifyContent: "space-around"
    },
    titulo:{
        paddingTop: "75px",
        textAlign: "center"
    },
    media:{
        width: "45%"
    },
    form:{
        width: "45%",
        display: "flex",
        alignItems: "unsafe",
        flexDirection: "column"
    },
    spaceForm:{
        margin: "15px 0px",
    },
    selector: {
        margin: theme.spacing(1),
        minWidth: 220,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    divbuttons:{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "20px"
    },
    spacebetweenbuttons:{
        marginRight: "20px",
        outline: ""
    },
    dropzone: {
    textAlign: "center",
    padding: "20px",
    border: "3px dashed #eeeeee",
    backgroundColor: "#fafafa",
    color: "",
    marginBottom: "20px",
    "&:hover":{
        cursor: "pointer"
    },
    "&:focus":{
        outline: 0
    }
    },
    textRedUpload:{
        color: "red"
    },
    textGreenUpload:{
        color: "green"
    },
    containerPreview:{
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    },
    caratulaPreview:{
        width: "200px"
    },
    closeIcon:{
        marginTop: "20px",
        transition: "0.3s all",
        "&:hover": {
            color: "red",
            cursor: "pointer",
            transition: "0.3s all"
        }
    }
}));


export default function FormUploader() {
    const classes = useStyles();

    const [song, setSong] = useState([]);

    function handleSong(event) {
        alert(event.target.files[0]);
        setSong(event.target.files[0]);
    }
    function resetSong() {
        setSong('');
    }
    
    const [photo, setPhoto] = useState([]);
    function handlePhoto(event){
        alert(event.target.files[0]);
        setPhoto(event.target.files[0]);
    }
    function resetPhoto() {
        setPhoto('');        
    }

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDesc] = useState('');
    const [genero, setGen] = useState("");
    const [visibility, setVis] = useState("");

    async function handleInfo() {
        let artista = localStorage.getItem('usuario');
        const res = await fetch('/api/uploadsong', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                song,
                photo,
                titulo,
                descripcion,
                genero,
                visibility,
                artista
            })
        })
        console.log(res.json());
    }

    function PreviewCaratula() {
        return(
            <div className={classes.containerPreview}>
                <p>{photo.name}</p>
                <img src={URL.createObjectURL(photo)} className={classes.caratulaPreview}></img>
                <HighlightOffIcon onClick={resetPhoto} className={classes.closeIcon}/>
            </div>
        );
    }

    function PreviewCancion() {
        return (
            <div className={classes.containerPreview}>
                <p>{song.name}</p>
                <ThemeProvider theme={muiTheme}>
                    <AudioPlayer
                        elevation={1}
                        width="100%"
                        variation="default"
                        spacing={3}
                        order="standart"
                        preload="auto"
                        src={URL.createObjectURL(song)}
                    />
                </ThemeProvider>
                <HighlightOffIcon onClick={resetSong} className={classes.closeIcon} />
            </div>
        );
    }

    return (
        <div id="wrapper">
            <header>
                <MenuHeaderLoginSearch />
            </header>
            <h1 className={classes.titulo}>Subir nueva canción</h1>
            <form className={classes.root} onSubmit={handleInfo}>
                <div className={classes.media}>
                <h2>Archivos</h2>
                <p>Pista Musical</p>
                    <div>
                        {song == '' ? <Dropzone>
                            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                                <div {...getRootProps({ className: "dropzone" })} className={classes.dropzone}>
                                    <input {...getInputProps()} onChange={handleSong} accept="audio/*" />
                                    {!isDragActive && <p>Haz click a este contenedor para poder subir una canción.<br></br></p>}
                                    {isDragActive && !isDragReject && <p className={classes.textGreenUpload}>Archivo compatible, sueltalo para poder subir este archivo</p>}
                                    {isDragReject && <p className={classes.textRedUpload}>El archivo no es compatible con este campo. (ej: .jpg, )</p>}
                                </div>
                            )}
                        </Dropzone> : <PreviewCancion/>}
                    </div>
                <p>Foto de Caratula</p>
                    <div>
                        {photo == '' ? <Dropzone for="input-file">
                            {({ getRootProps, getInputProps, isDragActive, isDragReject}) => (
                                <div {...getRootProps({ className: "dropzone" })} className={classes.dropzone}>
                                    <input {...getInputProps()} onChange={handlePhoto} accept="image/*"/>
                                    {photo == '' ? <p>Haz click a este contenedor para poder subir una canción.<br></br></p> : <PreviewCaratula/> }
                                    {isDragActive && !isDragReject && <p className={classes.textGreenUpload}>Archivo compatible, sueltalo para poder subir este archivo</p>}
                                    {isDragReject && <p className={classes.textRedUpload}>El archivo no es compatible con este campo. (ej: .jpg, )</p>}
                                </div>
                            )}
                        </Dropzone> : <PreviewCaratula/>}
                    </div>
                </div>
                <div className={classes.form}>
                    <h2>Descripción de la pista</h2> 
                    <TextField id="standard-basic" label="Titulo" value={titulo} onChange={e => setTitulo(e.target.value)} className={classes.spaceForm} required/>
                    <TextareaAutosize aria-label="empty textarea" placeholder="Descripción (opcional)" value={descripcion} onChange={e => setDesc(e.target.value)} rowsMin={3} className={classes.spaceForm}/>
                    <FormControl className={classes.selector} required>
                        <InputLabel id="demo-simple-select-label">Género</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={genero}
                            onChange={e => setGen(e.target.value)}
                        >
                            <MenuItem value={"EDM"}>EDM</MenuItem>
                            <MenuItem value={"Dance"}>Dance</MenuItem>
                            <MenuItem value={"House"}>House</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.selector} required>
                        <InputLabel id="demo-simple-select-label">Visibilidad</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={visibility}
                            onChange={e => setVis(e.target.value)}
                        >
                            <MenuItem value={"publico"}>Publico</MenuItem>
                            <MenuItem value={"Privado"}>Privado</MenuItem>
                        </Select>
                    </FormControl>
                    <div className={classes.divbuttons}>
                        <Button variant="contained" color="secondary" className={classes.spacebetweenbuttons} onClick={() => { localStorage.setItem('state', 'homelogin'); window.location.reload(false);}}>
                            Salir
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            Subir
                        </Button>
                    </div>
                </div>
                </form>
        </div>
    );
}