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
import CircularProgress from '@material-ui/core/CircularProgress';
import { MenuHeaderLoginSearch } from './Menu';
import { storage } from '../firebase/config';

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

    // Subir cancion a firebase
    const [song, setSong] = useState("");//Almacenar momentaniamente la informacion para poder hacer la preview y recuperar datos
    const [urlsong, setUrlSong] = useState("");// almacenar la direccion url de firebase con el archivo para guardarla en la BBDD mas tarde
    const [progressong, setProgressSong] = useState(0);

    function handleSong(event) {
        var file = event.target.files[0];
        setSong(file);

        var namefile = String(file.name);
        var typefile = String(file.type);
        var blob = new Blob([file], { type: typefile });//convierto el archivo a un blob con el tipo de archivo dinamicamente.

        const uploadSong = storage.ref(`songs/${namefile}`).put(blob);
        uploadSong.on(
            "state_changed",
            snapshot => { 
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgressSong(progress);
             },
            error => {
                console.log(error);
            },
            () => {
                storage.ref("songs").child(namefile).getDownloadURL().then(url => { setUrlSong(url); });
            }
        );
        
    }
    function resetSong() {
        setSong('');
        var namefile = String(song.name);
        storage.ref(`songs/${namefile}`).delete();
        setProgressSong(0);
    }
    
    //Subir caratula a Firebase
    const [photo, setPhoto] = useState("");
    const [urlCaratula, setUrlCarat] = useState("");
    const [progrescarat, setProgressCarat] = useState(0);

    function handlePhoto(event){
        var file = event.target.files[0];
        setPhoto(file);
        //FireBase Upload
        var namefile = String(file.name);
        var typefile = String(file.type);
        var blob = new Blob([file], { type: typefile });//convierto el archivo a un blob con el tipo de archivo dinamicamente.
        console.log(blob);

        const uploadCarat = storage.ref(`caratulas/${namefile}`).put(blob);
        uploadCarat.on(
            "state_changed",
            snapshot => { 
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgressCarat(progress);
             },
            error => {
                console.log(error);
            },
            () => {
                storage.ref("caratulas").child(namefile).getDownloadURL().then(url => { setUrlCarat(url); });
            }
        );
        console.log(urlCaratula);
    }
    function resetPhoto() {
        setPhoto('');
        var namefile = String(photo.name);
        storage.ref(`songs/${namefile}`).delete();
        setProgressCarat(0);
    }

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDesc] = useState('');
    const [genero, setGen] = useState("");
    const [visibility, setVis] = useState("");
    async function handleInfo(event) {
        event.preventDefault();
        let artista = localStorage.getItem('usuario');

        // API CALL
        const res = await fetch('/api/uploadsong', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                urlsong,
                urlCaratula,
                titulo,
                descripcion,
                genero,
                visibility,
                artista
            })
        })
        console.log(res);
    }

    function PreviewCaratula() {
        return(
            <div className={classes.containerPreview}>
                <p>{photo.name}</p>
                <img src={URL.createObjectURL(photo)} className={classes.caratulaPreview}></img>
                {progrescarat == 100 ? <HighlightOffIcon onClick={resetPhoto} className={classes.closeIcon} /> : <CircularProgress className={classes.closeIcon} variant="static" value={progrescarat} max="100" />}
            </div>
        );
    }

    function PreviewCancion() {
        return (
            <div className={classes.containerPreview}>
                <p>{song.name}</p>
                <ThemeProvider theme={muiTheme}>
                    <AudioPlayer
                        width="100%"
                        variation="default"
                        spacing={3}
                        order="standart"
                        preload="auto"
                        src={URL.createObjectURL(song)}
                    />
                </ThemeProvider>
                {progressong == 100 ? <HighlightOffIcon onClick={resetSong} className={classes.closeIcon} /> : <CircularProgress className={classes.closeIcon} variant="static" value={progressong} max="100"/>}
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
                        {song == '' ? <Dropzone onDrop={handleSong}>
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
                        <Button variant="contained" color="primary" type="submit" disabled={progrescarat == 100 && progressong == 100 ? false : true}>
                            Subir
                        </Button>
                    </div>
                </div>
                </form>
        </div>
    );
}