"use client"
import '../../css/style.css'
import '../../css/skel.css'
import '../../css/style-xlarge.css'
import axios from "axios";
import { useRouter } from "next/navigation";

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
            if(json.data.vo != null) {
                sessionStorage.setItem("vo", json.data.vo);
                sessionStorage.setItem("m_id", json.data.m_id);
                sessionStorage.setItem("tr_idx", json.data.tr_idx);
                router.push('/myPage');
            }else {
                alert("아이디 또는 비밀번호를 잘못 입력했습니다.");
                return;
            }
        });
    }
    return(
        <div className="login-wrapper">
            {
                sessionStorage.getItem("vo") === null
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
                            <a type="button" className="button big bg-color-naver">네이버</a>
                            <a type="button" className="button big bg-color-kakao">카카오</a>
                            <a type="button" className="button big bg-color-google">구글</a>
                        </div>
                    </div>
                : <div className='login-box'><p>로그인 완료</p></div>
            }
        </div>

    );
}