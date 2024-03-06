import React from "react";

export const GoogleLogin = () => {
    const GOOGLE_CLIENT_ID = "921898621652-9ipomq19a4p88ofgn8ilhhb2gd0ea92c.apps.googleusercontent.com";
    const REDIRECT_URI = "http://localhost:3000/googleAuth";
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&scope=https://www.googleapis.com/auth/userinfo.email&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

    function googleLogin() {
        window.location.href = GOOGLE_AUTH_URL;
    };

    return(
        <button type="button" id='google-login-btn' onClick={() => googleLogin()}><img src='images\google-login.png' style={{width: '100%', height: '100%'}}/></button>
    )
}