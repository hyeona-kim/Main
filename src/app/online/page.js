"use client"
import Banner from "@/component/Banner";
import React, { useState } from "react";

// const api_uri , axios.post location.href 주소 확인 필요  

export default function online() {
    function handleData() {
        // const api_uri = "/bbs/write";
        const formData = new FormData();


        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let phone = document.getElementById("phone");
        let content = document.getElementById("content");

        formData.append("name", name.value);
        formData.append("email", email.value);
        formData.append("phone", phone.value);
        formData.append("content", content.value);

        // //비동기식 통신
        // axios.post(
        //     api_uri, formData,{headers:{"Content-Type":'multipart/form-data',}}
        // ).then((res)=>{
        //     console.log("Res:"+res.data.res);
        // });
        // location.href="/list";

    }

    return (
        <>
            <Banner />
            <section id="one" className="wrapper style1">
                <header className="major">
                    <h1>온라인 상담 신청</h1>
                </header>
                <div>
                    <div>
                        <div>
                            <form id="frm">
                                <table>
                                    <caption>온라인 상담 신청 테이블</caption>
                                    <tbody>
                                        <tr>
                                            <td><input type="text" id="name" required placeholder="이름을 입력하세요"></input></td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" id="w" name="gender"></input></td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" id="m" name="gender"></input></td>
                                        </tr>
                                        <tr>
                                            <td><input type="email" id="email" required placeholder="이메일을 입력하세요"></input></td>
                                        </tr>
                                        <tr>
                                            <td><input type="text" id="phone" name="phone" required placeholder="연락처을 입력하세요" /></td>
                                        </tr>
                                        <tr>
                                            <td><textarea id="content" required placeholder="내용을 입력하세요"></textarea></td>
                                        </tr>
                                            <button type="button" onClick={handleData}>저장</button>
                                    </tbody>
                                </table>
                            </form>
                        </div >
                    </div >
                </div>
            </section >
        </>
    );
}