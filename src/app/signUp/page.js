"use client"
import '../../css/style.css'
import '../../css/skel.css'
import '../../css/style-xlarge.css'
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { NaverLogin } from '@/component/NaverLogin';
import { KakaoLogin } from '@/component/KakaoLogin';

export default function signUp() {
    const api_uri = '/login/regMember';
    const router = useRouter();
    const [id_flag, setIdFlag] = useState(false);
    const [email_flag, setEmailFlag] = useState(false);

    function regMember(){
        const m_id = document.getElementById("m_id").value;
        const m_pw = document.getElementById("m_pw").value;
        const m_email = document.getElementById("m_email").value;
        const m_name = document.getElementById("m_name").value;
        const m_phone = document.getElementById("m_phone").value;
        
        // 각 데이터들 유효성 검사
        if(m_id.trim().length < 4) {
            alert("아이디는 4자리(공백제외) 이상 입력하세요");
            return;
        }
        if(!m_pw.trim().length > 0) {
            alert("비밀번호를 입력하세요");
            return;
        }
        if(!m_email.trim().length > 0) {
            alert("이메일을 입력하세요");
            return;
        }
        if(!m_name.trim().length > 0) {
            alert("이름을 입력하세요");
            return;
        }
        if(m_phone.trim().length != 13) {
            alert("연락처를 정확히 입력하세요");
            return;
        }
        
        // 중복된 id이면 회원가입 block
        if(id_flag) {
            alert("아이디가 중복됩니다.")
            return;
        }

        // 중복된 email이면 회원가입 block
        if(email_flag) {
            alert("이메일이 중복됩니다.")
            return;
        }

        axios.post(
            api_uri+"?m_id="+m_id+
                "&m_pw="+m_pw+
                "&m_email="+m_email+
                "&m_name="+m_name+
                "&m_phone="+m_phone
        ).then(json => {
            // replace를 활용해 뒤로가기를 했을 때 다시 회원가입 페이지로 가지 않게끔 한다
            router.replace("/login");
        });
    }

    // 회원가입시 id 중복체크 기능
    function checkSameId() {
        const m_id = document.getElementById("m_id").value;
        const element = document.getElementById("check-text");

        axios.get(
            "/login/checkSameId?m_id="+m_id,
        ).then(json => {
            if(json.data) { // data가 True면 중복, False면 중복아님
                element.innerHTML = "<div>중복입니다.</div>";
                element.style.setProperty('color', 'red');
                setIdFlag(true);
            }else{
                element.innerHTML = "<div>중복되지 않습니다.</div>";
                element.style.setProperty('color', 'blue');
                setIdFlag(false);
            }
        });
    }

    // [중복체크] 클릭시 email 중복체크 기능
    function checkEmail() {
        const m_email = document.getElementById("m_email").value;

        axios.get(
            "/login/checkSameEmail?m_email="+m_email
        ).then(json => { // data가 True면 중복, False면 중복아님
            if(json.data) {
                setEmailFlag(true);
                alert("중복됩니다 변경하세요");
                return;
            }else {
                setEmailFlag(false);
                alert("중복되지 않습니다 그대로 진행하세요");
            }
        });
    }

    return(
        <div className="login-wrapper" id="login-wrapper">
            <div className="login-box" id="login-box">
                <div className="ict-logo">
                    <h1>회원가입</h1>
                </div>
                    <table className="login-table">
                        <caption>회원가입 Form 테이블</caption>
                        <tbody id="login-tbody">
                            <tr>
                                <td>
                                    <input type="text" id="m_id" className="login-input" onKeyUp={() => checkSameId()} placeholder="아이디"/>
                                </td>
                                <td id='check-text'>
                                    <div className='font-color-blue'>중복되지 않습니다.</div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}><input type="password" id="m_pw" className="login-input" placeholder="비밀번호"/></td>
                            </tr>
                            <tr>
                                <td><input type="text" id="m_email" className="login-input" placeholder="이메일"/></td>
                                <td><button className="button" onClick={() => checkEmail()}>중복체크</button></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><input type="text" id="m_name" className="login-input" placeholder="이름"/></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><input type="text" id="m_phone" className="login-input" placeholder="연락처 ((예)010-1234-5678)"/></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><button className="font-bold font-size-20" onClick={() => regMember()}>회원가입</button></td>
                            </tr>
                        </tbody>
                    </table>
                <hr/>
                <div className="sns-login-btn">
                    {/* <a type="button" className="button big bg-color-naver">네이버</a> */}
                    {/* <a type="button" className="button big bg-color-kakao">카카오</a> */}
                    <NaverLogin/>
                    <KakaoLogin/>
                    <a type="button" className="button big bg-color-google">구글</a>
                </div>
            </div>
        </div>

    );
}