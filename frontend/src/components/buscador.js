import React from 'react';

class Buscador extends React.Component{
    constructor(){
        super();
        this.state = {
            search: ''
        };
    }

    updateSearch(event){
        this.setState({search: event.target.value});
    }
}

export default Buscador;