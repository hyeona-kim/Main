"use client"
import '../css/style.css'
import '../css/skel.css'
import '../css/style-xlarge.css'
import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function Header(){
    const [ar, setAr] = useState([]);
    const api_uri = '/login/getCtList';

    function getCourseTypeList(){
        axios.get(
            api_uri,
        ).then(json => {
            setAr(json.data.ar);
        });
        // app.use(express.urlencoded({ extended: true }))
    };

    useEffect(() => {
        getCourseTypeList();
    },[]);

    return (
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
                        {ar.map((list) => (
                            <li key={list.ct_idx}><a href="/java" className="menu-name">{list.ct_name}</a></li>
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
                    <li><a href="/login" className="button special">Login</a></li>
                </ul>
            </nav>
        </header>
        
    );
}
