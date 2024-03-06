import React from "react";

export const NaverLogin = () => {
    // const NAVER_CLIENT_ID = `${process.env.REACT_APP_NAVER_CLIENT_ID}`;
    const NAVER_CLIENT_ID = "Xcta2ntEsGR7Vtf5pcVC";
    const REDIRECT_URI = "http://localhost:3000/naverAuth";
    const STATE = "Random_State";
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

    function NaverLogin() {
        window.location.href = NAVER_AUTH_URL;
        // console.log(NAVER_CLIENT_ID);
    };

    return(
        <button onClick={NaverLogin} id='naver-login-btn'><img src='images\naver-login.png' style={{width: '100%', height: '100%'}}/></button>
    )
}