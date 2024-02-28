"use client"
import '../css/style.css'
import '../css/skel.css'
import '../css/style-xlarge.css'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Header(){
    const router = useRouter();
    const [ar, setAr] = useState([]);
    const api_uri = '/login/getCtList';

    function getCourseTypeList(){
        axios.get(
            api_uri,
        ).then(json => {
            setAr(json.data.courseTypeAr);
        });
        // app.use(express.urlencoded({ extended: true }))
    };

    function goCtList(idx) {
        router.push('/ctList/'+idx);
    };

    function logout() {
        sessionStorage.removeItem("vo");
    };

    useEffect(() => {
        getCourseTypeList();
        
    },[]);

    return (
        <>
        <header id="header" className="skel-layers-fixed">
            <h1>
                <a href="/"><img src='images/ict_logo.png'></img></a>
            </h1>
            <nav id="nav">
                <ul id="menu">
                    <li><a href="/">Home</a></li>
                    <li className="menu-item">
                        <a href="#" className="menu-name">학원소개</a>
                        <ul className="dropdown">
                            <li><a href="/staffList" className="menu-name">강사소개</a></li>
                            <li><a href="/map" className="menu-name">오시는길</a></li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        <a href="#" className="menu-name">교육과정</a>
                        <ul className="dropdown">
                    {/* 반복문을 이용해 교육과정 목록 출력 */}
                        {ar.map((list) => (
                            <li key={list.ct_idx}><button className="menu-name" onClick={() => goCtList(list.ct_idx)}>{list.ct_name}</button></li>
                        ))}
                        </ul>
                    </li>
                    <li className="menu-item">
                        <a href="/online" className="menu-name">상담센터</a>
                        <ul className="dropdown">
                            <li><a href="/online" className="menu-name">온라인상담</a></li>
                            <li><a href="/Qna" className="menu-name">Q&A</a></li>
                        </ul>
                    </li>

                    {/* 삼항연산자를 이용해 로그인 후 버튼을 다르게 출력 */}
                    {
                        sessionStorage.getItem("vo") === null
                        ?   <>
                            <li><a href="/login" className="button special">Login</a></li>
                            <li><a href="/signUp" className="button special">Sign Up</a></li>
                            </>
                        :   <>
                            <li><a href="/myPage" className="button special">My Page</a></li>
                            <li><a href="/" className="button special" onClick={() => logout()}>Logout</a></li>
                            </>
                    }
                </ul>
            </nav>
        </header>
        </>
    );
}
