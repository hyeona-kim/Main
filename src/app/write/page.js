"use client"

import axios from "axios";

export default function write() {

    function handleData(){
        const api_uri = "/bbs/write";
        const formData = new FormData();

        // 아이디가 subject, writer, content인 요소들의 값을 받아낸다.

        let subject = document.getElementById("subject");
        let writer = document.getElementById("writer");
        let content = document.getElementById("content");
        let f = document.getElementById("file");
        let bname = document.getElementById("bname");

        formData.append("subject", subject.value);
        formData.append("writer", writer.value);
        formData.append("content", content.value);
        formData.append("bname", "bbs");
        formData.append("file", f.files[0]);

        //비동기식 통신
        axios.post(
            api_uri, formData,{headers:{"Content-Type":'multipart/form-data',}}
        ).then((res)=>{
            console.log("Res:"+res.data.res);
        });
        location.href="/Qna";

    }


    return (
        <>
            <div style={{ width: '80%', margin: 'auto', paddingTop: '20px' }}>
                <header>
                    <h1 className="title">글쓰기 페이지</h1>
                </header>
                <hr />
                <div className="form-div">
                    <form id="frm">
                        <input type="text" id="subject" required placeholder="제목을 입력하세요"></input>
                        <input type="text" id="writer" required placeholder="글쓴이을 입력하세요"></input>
                        <textarea id="content"></textarea>
                        <input type="file" id="file"></input>
                        <button type="button" onClick={handleData}>전송</button>
                    </form>
                </div>
            </div>
        </>


    );
}