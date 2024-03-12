"use client"
import '../../css/style.css'
import '../../css/skel.css'
import '../../css/style-xlarge.css'
import axios from "axios";
import { useRouter } from "next/navigation";
import { NaverLogin } from '@/component/NaverLogin';
import { KakaoLogin } from '@/component/KakaoLogin';
import { useEffect } from 'react';
import { GoogleLogin } from '@/component/GoogleLogin';

export default function Login() {
    const router = useRouter();

    const api_uri = '/login/login';

    function login(){
        const m_id = document.getElementById("login-id-input").value;
        const m_pw = document.getElementById("login-pw-input").value;
        if(!m_id.trim().length > 0) {
            alert("아이디를 입력하세요");
            return;
        }
        if(!m_pw.trim().length > 0) {
            alert("비밀번호를 입력하세요");
            return;
        }
        axios.get(
            api_uri+"?m_id="+m_id+"&m_pw="+m_pw,
        ).then(json => {
            if(json.data.memberVo != null) {
                sessionStorage.setItem("memberVo", json.data.memberVo);
                sessionStorage.setItem("m_id", json.data.m_id);
                sessionStorage.setItem("m_name", json.data.m_name);
                sessionStorage.setItem("tr_idx", json.data.tr_idx);
                router.push("/myPage");
            }else {
                alert("아이디 또는 비밀번호를 잘못 입력했습니다.");
                return;
            }
        });
    };

    function checkLogin() {
        const vo = sessionStorage.getItem("memberVo");
        if(vo != null){
            router.push("/myPage");
        }else {
            router.push("/login");
        }
    };

    useEffect(function(){
        checkLogin();
    },[]);


    return(
        <div className="login-wrapper">
            {
                sessionStorage.getItem("memberVo") === null
                ? 
                    <div className="login-box">
                        <div className="ict-logo">
                            <h1>한국ICT인재개발원</h1>
                        </div>
                        <form>
                            <table className="login-table">
                                <caption>로그인 Form 테이블</caption>
                                <tbody id="login-tbody">
                                    <tr>
                                        <td><input type="text" id="login-id-input" placeholder="아이디 입력"></input></td>
                                    </tr>
                                    <tr>
                                        <td><input type="password" id="login-pw-input" name="" placeholder="비밀번호 입력"></input></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}><button className="font-bold font-size-20" onClick={() => login()}>로그인</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                        <hr/>
                        <div className="sns-login-btn">
                            <NaverLogin/>
                            <KakaoLogin/>
                            <GoogleLogin/>
                        </div>
                    </div>
                : 
                <div className="login-wrapper">
                    <div className="login-box">
                        <div className="ict-logo" id="loading-box">
                            <h1>Loading...</h1>
                        </div>
                    </div>
                </div>
            }
        </div>

    );
}