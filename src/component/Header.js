import Image from "next/image";
import Nav from "./Nav";

import '../css/style.css'
import '../css/skel.css'
import '../css/style-xlarge.css'


export default function Header(){
    return (
        <header id="header" class="skel-layers-fixed"><h1><a href="#">Ion</a></h1>
				<nav id="nav">
                    <ul>
                        <li><a href="/">Home</a></li>
						<li><a href="left-sidebar.html">학원소개</a></li>
						<li><a href="right-sidebar.html">교육과정</a></li>
						<li><a href="no-sidebar.html">메뉴1</a></li>
						<li><a href="#" class="button special">Sign Up</a></li>
					</ul>
                </nav>
        </header>
        
    );
}
