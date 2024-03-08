'use client'

import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import Router from "next/router";
import { useEffect, useState } from "react";

export default function Page(props) {
    const idx = `${props.params.idx}`;

    const [vo, setVo] = useState([]);
    const [ar, setAr] = useState([]);
    const api_uri = `/login/qna/view?qna_idx=${idx}`;   //grave 활용


    //  수정 버튼을 누르기위해 본인인지 확인하는용 
    const m_idx = `${props.params.m_idx}`
    const vo2 = sessionStorage.getItem("m_id");
    const [mem, setMem] = useState([]);
    const api_uri2 = "/login/getmemberVO";
    const api_uri3 = `/login/qna/commList?qna_idx=${idx}`;
    const api_uri4 = "/login/qna/del";
    const router = useRouter();


    function chkIdentity() {
        axios.get(
            api_uri2 + "?qna_idx" + vo2
        ).then((json) => {
            setMem(json.data.ar);
            if (vo2 === null ||  vo2 !== vo.m_id) {
                alert("접근권한이 없습니다.")
                router.push('/view/' + vo.qna_idx)
            } else {
                router.push("/edit/" + vo.qna_idx + "/" + vo2)
            }
        })
    }
    
    function delIdentity() {
        axios.get(
            api_uri4 + "?qna_idx"+vo2
        ).then((json)=>{
            setMem(json.data.ar);
            if(vo2 === null || vo2 !== vo.m_id){
                alert("삭제권한이 없습니다")
                router.push('/view'+vo.qna_idx)
            }else{
                router.push("/Qna")
            }
        })
    }




    function getData() {
        axios.get(
            api_uri
        ).then((json) => {
            setVo(json.data.vo);
        });
    }

    function getData2() {
        axios.get(
            api_uri3
        ).then((json) => {
            setAr(json.data.ar);
            console.log(ar);
        })
    }

    useEffect(() => {
        getData();
        getData2();

    }, []);

    function goQna() {
        router.push("/Qna");
    };


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
                                    <Button variant="contained" color="secondary" onClick={chkIdentity}>수정</Button>&nbsp;&nbsp;&nbsp;
                                    <Button variant="contained" color="primary" onClick={goQna}>닫기</Button>&nbsp;&nbsp;&nbsp;
                                    <Button variant="contained" color="error" onClick={delIdentity}>삭제</Button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <table className="comm-table">
                        <caption>답변 테이블</caption>
                        <colgroup>
                            <col width={"20%"} />
                            <col width={"80%"} />
                        </colgroup>
                        <tbody>
                            {ar.map((ar) => (
                                <tr key={ar.cm_idx}>
                                    <td><label style={{ backgroundColor: 'yellow' }}>답변:</label></td>
                                    <td><textarea value={ar.cm_content} readOnly></textarea></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>


    );
}