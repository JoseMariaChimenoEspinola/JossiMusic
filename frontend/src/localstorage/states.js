
function SetUserState(params, id) {
    localStorage.setItem('state',params);
    localStorage.setItem('usuario', id);
}

function SetState(params) {
    localStorage.setItem('state', params);
    window.location.reload(false);
}

function GetStateLogin() {
    return localStorage.getItem('state');
}

export { SetUserState, GetStateLogin, SetState};