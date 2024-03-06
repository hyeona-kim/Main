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
    const googleLogin_uri = "https://accounts.google.com/o/oauth2/v2/auth?" +
                    "client_id=921898621652-9ipomq19a4p88ofgn8ilhhb2gd0ea92c.apps.googleusercontent.com&"+
                    "redirect_uri=http://localhost:3000/login&"+
                    "response_type=token&"+
                    "scope=https://www.googleapis.com/auth/drive.metadata.readonly";

    function googleLogin() {
        axios.get(
            googleLogin_uri,
        ).then(json => {
            console.log(json);
        });
    };

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
                            {/* <a type="button" className="button big bg-color-naver">네이버</a>
                            <button type="button" id='kakao-login-btn' onClick={() => kakaoCheck()}><img src='images\kakao-login.png' style={{width: '100%', height: '100%'}}/></button>
                            <a type="button" className="button big bg-color-google">구글</a> */}
                            {/* <a type="button" id="kakao-login-btn" className="button big bg-color-kakao"><img src='images\kakao-login.png' style={{width: '140px', height: '100%'}}/></a> */}
                            {/* <button type="button" id='google-login-btn' onClick={() => googleLogin()}><img src='images\google-login.png' style={{width: '100%', height: '100%'}}/></button> */}
                            <NaverLogin/>
                            <KakaoLogin/>
                            <GoogleLogin/>
                        </div>
                    </div>
                : <div className='login-box'><p>로그인 완료</p></div>
            }
        </div>

    );
}