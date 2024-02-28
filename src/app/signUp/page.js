"use client"
import '../../css/style.css'
import '../../css/skel.css'
import '../../css/style-xlarge.css'
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function signUp() {
    const api_uri = '/login/regMember';
    const router = useRouter();
    const [flag, setFlag] = useState(false);

    function regMember(){
        const m_id = document.getElementById("m_id").value;
        const m_pw = document.getElementById("m_pw").value;
        const m_email = document.getElementById("m_email").value;
        const m_name = document.getElementById("m_name").value;
        const m_phone = document.getElementById("m_phone").value;

        // 각 데이터들 유효성 검사
        if(!m_id.trim().length > 4) {
            alert("아이디는 4자리(공백제외) 이상 입력하세요");
            return;
        }
        if(!m_pw.trim().length > 0) {
            alert("비밀번호를 입력하세요");
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

    // 회원가입시 중복체크 기능 다시 확인해야함
    // 정상적으로 작동안함 (하나씩 밀리면서 작업됨)
    function checkSameId() {
        const m_id = document.getElementById("m_id").value;
        const element = document.getElementById("check-text");

        axios.get(
            "/login/checkSameId?m_id="+m_id,
        ).then(json => {
            if(json.data) { // data가 True면 중복, False면 중복아님
                element.innerHTML = "<div className='font-color-red'>중복입니다.</div>";
                setFlag(true);
            }else{
                element.innerHTML = "<div className='font-color-blue'>중복되지 않습니다.</div>";
                setFlag(false);
            }
            console.log(flag);
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
                                <td colSpan={2}><input type="text" id="m_email" className="login-input" placeholder="(선택)이메일"/></td>
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
                    <a type="button" className="button big bg-color-naver">네이버</a>
                    <a type="button" className="button big bg-color-kakao">카카오</a>
                    <a type="button" className="button big bg-color-google">구글</a>
                </div>
            </div>
        </div>

    );
}