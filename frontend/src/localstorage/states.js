import React from 'react';

function SetUserState(params, user) {
    localStorage.setItem('state',params);
    localStorage.setItem('usuario', user);
}

function GetStateLogin() {
    return localStorage.getItem('state');
}

function DeleteStateLogin() {
    localStorage.removeItem('state');
    localStorage.removeItem('usuario');
    window.location.reload(false);
}

export { SetUserState, GetStateLogin, DeleteStateLogin};