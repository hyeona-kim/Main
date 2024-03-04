"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export default function write(props) {
    const m_idx = `${props.params.m_idx}`
    const [mem, setMem] = useState([]);
    const api_uri = "/login/getmemberVO";

    function getmemberVO() {
        axios.get(
            api_uri+"?m_idx="+m_idx
        ).then((json) => {
            setMem(json.data.ar);
        });
    }

    useEffect(() => {
        getmemberVO();
    }, []);


    function handleData() {
        const api_uri = "/login/qna/write";
        const formData = new FormData();

        // 아이디가 m_name, m_title, content인 요소들의 값을 받아낸다.

        let m_name = document.getElementById("m_name");
        let m_title = document.getElementById("m_title");
        let m_content = document.getElementById("m_content");

        formData.append("m_name", m_name.value);
        formData.append("m_title", m_title.value);
        formData.append("m_content", m_content.value);

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
                        <h1>Q&A 글쓰기</h1>
                    </div>
                    <table className="qna-table">
                        <caption>Q&A 글쓰기</caption>
                        <colgroup>
                            <col width="20%" />
                            <col width="80%" />
                        </colgroup>
                        {mem.map((vo) => (
                            <tbody id="qna-tbody" key={vo.m_idx} >
                                <tr>
                                    <td><label htmlFor="m_name">글쓴이:</label></td>
                                    <td><span id="m_name">{vo.m_name}</span></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="m_title">제목:</label></td>
                                    <td><input type="text" id="m_title" placeholder="제목" /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="m_content">내용:</label></td>
                                    <td><textarea id="m_content" placeholder="내용"></textarea></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><button className="font-bold font-size-17" onClick={handleData}>등록</button></td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>

        </>


    );
}