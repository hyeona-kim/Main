'use client'

import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import Router from "next/router";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const idx = `${params.idx}`;

    const [vo, setVo] = useState([]);
    const api_uri = `/login/qna/view?qna_idx=${idx}`;   //grave 활용
    const router = useRouter();

    function getData() {
        axios.get(
            api_uri
        ).then((json) => {
            setVo(json.data.vo);
        });
    }

    useEffect(() => {
        getData();
    },[]);

    function goQna() {
        router.push("/Qna");
    };
    
    function goeidt(){
        router.push('/edit/'+vo.qna_idx);
    }

    return (
        <>
            <div className="qna-wrapper">
                <div className="qna-box">
                    <div className="ict-logo">
                        <h1>Q&A 상세페이지</h1>
                    </div>
                    <table className="qna-table">
                        <caption>Q&A 상세페이지</caption>
                        <colgroup>
                            <col width="20%" />
                            <col width="80%" />
                        </colgroup>
                        <tbody id="qna-tbody" >
                            <tr>
                                <td><label htmlFor="qna_writer">글쓴이:</label></td>
                                <td>{vo.qna_writer}</td>
                            </tr>
                            <tr>
                                <td><label htmlFor="qna_title">제목:</label></td>
                                <td>{vo.qna_title}</td>
                            </tr>
                            <tr>
                                <td><label htmlFor="qna_content">내용:</label></td>
                                <td><textarea id="qna_content" value={vo.qna_content}></textarea></td>
                            </tr>
                            {/* <tr>
                                <td colSpan={2}><button className="font-bold font-size-17" onClick={handleData}>등록</button></td>
                            </tr> */}
                        </tbody>
                        <tfoot>
                                    <tr>
                                        <td colSpan={3}> 
                                            <Button variant="contained" color="secondary" onClick={goeidt}>수정</Button>&nbsp;&nbsp;&nbsp;
                                            <Button variant="contained" color="primary" onClick={goQna}>닫기</Button>&nbsp;&nbsp;&nbsp;
                                            <Button variant="contained" color="error">삭제</Button>
                                        </td>
                                    </tr>
                                </tfoot>
                    </table>
                </div>
            </div>

        </>


    );
}