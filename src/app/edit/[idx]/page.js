"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function write(props) {
    const idx = `${props.params.idx}`;
    const [vo2,setVo2] = useState([]);

    const m_idx = `${props.params.m_idx}`
    const vo = sessionStorage.getItem("m_id");
    const [mem, setMem] = useState([]);
    const api_uri = `/login/qna/eidt?qna_idx=${idx}`;
    const api_uri2 = "/login/getmemberVO";

    const router = useRouter();

    function berVO() {
        axios.get(
            api_uri+"?m_id="+vo
        ).then((json) => {
            
            setMem(json.data.ar);

        });
    }

    function edit(){
        axios.get(
            api_uri,
        ).then((json) =>{
            setVo2(json.data.vo2)
        })
    }

    useEffect(() => {
       edit();
    }, []);


    function handleData() {
        const api_uri = "/login/qna/edit";
        const formData = new FormData();

        // 아이디가 m_name, m_title, content인 요소들의 값을 받아낸다.

        let qna_writer = document.getElementById("qna_writer");
        let qna_title = document.getElementById("qna_title");
        let qna_content = document.getElementById("qna_content");
        let m_id = document.getElementById("m_id");

        formData.append("qna_writer", qna_writer.value);
        formData.append("qna_title", qna_title.value);
        formData.append("qna_content", qna_content.value);
        formData.append("m_id", m_id.value);

        //비동기식 통신 
        axios.post(
            api_uri, formData, { headers: { "Content-Type": 'multipart/form-data', } }
        ).then((res) => {
            console.log("Res:" + res.data.res);
        });
        location.href = "/Qna";

    }


    return (
        <>
            <div className="qna-wrapper">
                <div className="qna-box">
                    <div className="ict-logo">
                        <h1>Q&A 수정</h1>
                    </div>
                    <table className="qna-table">
                        <caption>Q&A 수정</caption>
                        <colgroup>
                            <col width="20%" />
                            <col width="80%" />
                        </colgroup>
                            <tbody id="qna-tbody">
                                <tr>
                                    <td><label htmlFor="qna_writer">글쓴이:</label></td>
                                    <td><input type="text" id="qna_writer" placeholder="이름"></input></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="qna_title">제목:</label></td>
                                    <td><input type="text" id="qna_title" placeholder="제목" /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="qna_content">내용:</label></td>
                                    <td><textarea id="qna_content" placeholder="내용">{vo2.qna_content}</textarea></td>
                                </tr>
                                {/* <tr>
                                    <td colSpan={2}><button className="font-bold font-size-17" onClick={handleData}>등록</button></td>
                                </tr> */}
                            </tbody>
                    </table>
                </div>
            </div>

        </>


    );
}