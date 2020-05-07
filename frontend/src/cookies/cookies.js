import React from 'react';
import Cookies from 'universal-cookie';

let _cookie = new Cookies();

function SetUserCookies(params) {
    _cookie.set('state',params, {path: '/'});
    alert(_cookie.get('state'));
}

function GetCookie() {
    return _cookie.get('state');
}

function deleteCookie() {
    _cookie.remove('state',{path: '/'});
    window.location.reload(false);
}

export { SetUserCookies, GetCookie, deleteCookie};