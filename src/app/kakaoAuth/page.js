"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function KakaoAuth(props) {
    const router = useRouter();
    const code = new URL(window.location.href).searchParams.get("code");

    async function getAccessToken() {
        axios.post(
            "https://kauth.kakao.com/oauth/token",
            {
                grant_type : "authorization_code",
                client_id : "bbf051ada2d3aea5dae376bc67cc6584",
                redirect_uri : "http://localhost:3000/kakaoAuth",
                code : code,
            },
            {
                headers : {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                }
            }
        ).then(json => {
            console.log(json.data.access_token);
            axios.get(
                "/login/kakaoLogin?token="+json.data.access_token,
            ).then(result => {
                // 여기서 서버에서 보낸 정보 가지고 체크해서 router 쓰기
                // 카카오에서 email 정보를 주지 않아서 DB랑 비교할 데이터가 없음
                console.log(result);
                router.push("/");
            });
        });
    };
    
    useEffect(function() {
        getAccessToken();
    },[]);

    return(
        <div className="login-wrapper">
            <div className="login-box">
                <div className="ict-logo" id="loading-box">
                    <h1>Loading...</h1>
                </div>
            </div>
        </div>
    );
}