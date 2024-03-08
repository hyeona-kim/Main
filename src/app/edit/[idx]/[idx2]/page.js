"use client"
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function write(props) {
    const idx = `${props.params.idx}`;
    const m_id = sessionStorage.getItem("m_id");
    const [vo,setVo] = useState([]);
    const api_uri = `/login/qna/view?qna_idx=${idx}`;
    const router = useRouter();

    function getData(){
        axios.get(
            api_uri
        ).then((json)=>{
            setVo(json.data.vo);
        });
    }

    useEffect(()=>{
        getData();
    },[]);
   

    function handleData() {
        const api_uri2 = "/login/qna/edit";
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
            api_uri2, formData, { headers: { "Content-Type": 'multipart/form-data', } }
        ).then((res) => {
            console.log("Res:" + res.data.res);
        });
        location.href = "/Qna";

    }
    function goQna() {
        router.push("/Qna");
    };


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
                                <input type="hidden" id="m_id"></input>
                                <tr>
                                    <td><label htmlFor="qna_writer">글쓴이:</label></td>
                                    <td><input type="text" id="qna_writer" value={vo.qna_writer}></input></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="qna_title">제목:</label></td>
                                    <td><input type="text" id="qna_title" placeholder="제목" value={vo.qna_title} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="qna_content">내용:</label></td>
                                    <td><textarea id="qna_content" placeholder="내용"></textarea></td>
                                </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan={3}>
                                    <Button variant="contained" color="secondary" onClick={handleData}>수정</Button>&nbsp;&nbsp;&nbsp;
                                    <Button variant="contained" color="primary" onClick={goQna}>닫기</Button>&nbsp;&nbsp;&nbsp;
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

        </>


    );
}