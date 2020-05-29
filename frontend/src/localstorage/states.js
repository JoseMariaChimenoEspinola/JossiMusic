import React from 'react';

function SetUserState(params, user) {
    localStorage.setItem('state',params);
    localStorage.setItem('usuario', user);
}

function SetState(params) {
    localStorage.setItem('state', params);
    window.location.reload(false);
}

function GetStateLogin() {
    return localStorage.getItem('state');
}

export { SetUserState, GetStateLogin, SetState};