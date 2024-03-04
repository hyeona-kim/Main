"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NaverAuth(props) {
    const router = useRouter();
    
    useEffect(function() {
        let code = new URL(window.location.href).searchParams.get("code");
        let state = new URL(window.location.href).searchParams.get("state");

        axios.post(
            "/login/naverLogin?code="+code+"&state="+state
        ).then((json) => {
            if(json.data.checkFlag){
                sessionStorage.setItem("memberVo", json.data.memberVo);
                sessionStorage.setItem("m_id", json.data.memberVo.m_id);
                sessionStorage.setItem("tr_idx", json.data.memberVo.tr_idx);
                router.push("/myPage");
                router.refresh();
            }else {
                router.push("/signUp");
            }
            console.log(json);
        });
    },[]);

    return(
        <>
        
        </>
    );
}