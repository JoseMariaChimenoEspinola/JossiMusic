import React, {useState} from 'react';
import { FilePond, registerPlugin } from "react-filepond";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {MenuHeaderLoginSearch} from './Menu';
// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const useStyles = makeStyles((theme) => ({
    root:{
        position: "absolute",
        top: "130px",
        left: "300px",
        right: "300px",
        border: "1px solid grey",
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
        alignItems: "flex-start",
        flexDirection: "column"
    },
    selector: {
        margin: theme.spacing(1),
        minWidth: 220,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    
}));


export default function FormUploader() {
    const classes = useStyles();

    const [song, setSong] = useState("");
    const [photo, setPhoto] = useState("");

    const [genero, setGen] = useState("");
    const [visibility, setVis] = useState("");

    return (
        <div id="wrapper">
            <header>
                <MenuHeaderLoginSearch />
            </header>
            <h1 className={classes.titulo}>Subir nueva canción</h1>
            <div className={classes.root}>
                
                <div className={classes.media}>
                <p>Pista Musical</p>
                <FilePond
                    files={song}
                    allowMultiple={true}
                    onupdatefiles={setSong}
                    labelIdle='Arrastra o selecciona la cancion que desees subir'
                    data-max-file-size="20MB"
                    acceptedFileTypes={['audio/*']}
                />
                <p>Foto de Caratula</p>
                <FilePond
                    files={photo}
                    allowMultiple={true}
                    onupdatefiles={setPhoto}
                    labelIdle='Arrastra o selecciona la cancion que desees subir'
                    data-max-file-size="20MB"
                    acceptedFileTypes={['image/*']}
                /> 
                </div>
                <div className={classes.form}>
                    <TextField id="standard-basic" label="Standard" />
                    <TextareaAutosize aria-label="empty textarea" placeholder="Empty" />
                    <FormControl className={classes.selector}>
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
                    <FormControl className={classes.selector}>
                        <InputLabel id="demo-simple-select-label">Género</InputLabel>
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
                </div>
            </div>
        </div>
    );
}