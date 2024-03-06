import React from "react";

export const KakaoLogin = () => {
    const KAKAO_CLIENT_ID = "bbf051ada2d3aea5dae376bc67cc6584";
    const REDIRECT_URI = "http://localhost:3000/kakaoAuth";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

    function KakaoLogin() {
        window.location.href = KAKAO_AUTH_URL;
    };

    return(
        <button onClick={KakaoLogin} id='kakao-login-btn'><img src='images\kakao-login.png' style={{width: '100%', height: '100%'}}/></button>
    )
}