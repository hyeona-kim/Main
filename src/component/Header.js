"use client"
import '../css/style.css'
import '../css/skel.css'
import '../css/style-xlarge.css'
import React from "react";

export default function Header(){
    return (
        <header id="header" className="skel-layers-fixed"><h1><a href="/">한국ICT인재개발원</a></h1>
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
                            <li><a href="/math" className="menu-name">수학</a></li>
                            <li><a href="/english" className="menu-name">영어</a></li>
                            <li><a href="/science" className="menu-name">과학</a></li>
                            <li><a href="/korean" className="menu-name">국어</a></li>
                        </ul>
                    </li>
                    <li><a href="no-sidebar.html">메뉴1</a></li>
                    <li><a href="/login" className="button special">Login</a></li>
                </ul>
            </nav>
        </header>
        
    );
}
