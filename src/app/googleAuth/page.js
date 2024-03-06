"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleAuth(props) {
    const router = useRouter();
    
    useEffect(function() {
        const parsedHash = new URLSearchParams(window.location.hash.substring(1));
        const access_token = parsedHash.get("access_token");
        axios.get(
            "/login/googleLogin?token="+access_token,
        ).then((json) => {
            if(json.data.checkFlag){
                sessionStorage.setItem("memberVo", json.data.memberVo);
                sessionStorage.setItem("m_id", json.data.memberVo.m_id);
                if(json.data.memberVo.tr_idx != null){
                    sessionStorage.setItem("tr_idx", json.data.memberVo.tr_idx);
                }
                router.push("/myPage");
                router.refresh();
            }else {
                router.push("/signUp");
            }
        });
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