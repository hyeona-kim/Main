"use client"
import EditModal from "@/component/EditModal";
import SubjectModal from "@/component/SubjectModal";
import TrainingBookModal from "@/component/TrainingBookModal";
import ViewReplyModal from "@/component/ViewReplyModal";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function myPage() {
    const [courseAr, setCourseAr] = useState([]);
    const [bookAr, setBookAr] = useState([]);
    const [replyAr, setReplyAr] = useState([]);
    const api_uri = "/login/myCourse";
    const m_id = sessionStorage.getItem("m_id");
    const router = useRouter();

    function trBookList(idx) {
        axios.get(
            "/login/trBookList?c_idx="+idx
        ).then((json) => {
            setBookAr(json.data.ar);
        });
    }

    useEffect(function() {
        axios.get(
            api_uri+"?m_id="+m_id
        ).then(json => {
            console.log(json);
            setCourseAr(json.data.ar);
            setReplyAr(json.data.replyAr);
        }); 
    },[]);

    return (
        <div className="wrapper">
            <div className="editMyInfo-wrapper">
                <div className="edit-myinfo-btn">
                    <EditModal/>
                </div>
                <article>
                    <h1>현재 수강중인 과정</h1>
                </article>
            {/* ===== 해당 교육과정 출력 부분 ===== */}
            {
            // 삼항 연산자를 이용하여 검색내용이 비었을 때 다르게 표시
            courseAr === null
            ?   <div className="my-course-table">
                    <table>
                        <tbody><tr><td className="font-center">해당 과정이 없습니다.</td></tr></tbody>
                    </table>
                </div>
            :   <div>
                    {courseAr.map((list) => (
                    <div className="my-course-table" key={list.c_idx}>
                        <table>
                            <colgroup>
                                <col width="20%"/>
                                <col width="40%"/>
                                <col width="40%"/>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th className="font-bold font-size-17">교육과정</th>
                                    <td className="align-left">{list.c_name}</td>
                                    <td rowSpan={3}>
                                        비고
                                    </td>
                                </tr>
                                <tr>
                                    <th className="font-bold font-size-17">교육기간</th>
                                    <td className="align-left">{list.start_date} ~ {list.end_date}</td>
                                </tr>
                                <tr>
                                    <th className="font-bold font-size-17">교육요일</th>
                                    <td className="align-left">{list.c_day}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={3}> 
                                        <Button variant="contained" color="success" onClick={() => trBookList(list.c_idx)}><TrainingBookModal ar={bookAr}/></Button>
                                        <SubjectModal idx={list.c_idx}/>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    ))}
                </div>
            }
            {/* ===== 해당 교육과정 출력 부분 ===== */}
            <article>
                    <h1>문의 답변 내역</h1>
            </article>
            {/* ===== 문의 답변 출력 부분 ===== */}
            {
            // 삼항 연산자를 이용하여 검색내용이 비었을 때 다르게 표시
            courseAr === null
            ?   
            <div className="my-course-table">
                <table>
                    <tbody><tr><td className="font-center">문의 답변 내역이 없습니다.</td></tr></tbody>
                </table>
            </div>
            :   
            <div>
                <div className="my-course-table">
                    <table>
                        <colgroup>
                            <col width="60%"/>
                            <col width="30%"/>
                            <col width="10%"/>
                        </colgroup>
                        <tbody>
                        {courseAr.map((list) => (
                            <tr key={list.c_idx}>
                                <td className="font-center">문의제목</td>
                                <td>작성일: {list.ac_write_date}</td>
                                <td>
                                    {/* <Button variant="contained" color="info" onClick={() => viewReply(list.c_idx)}>답변</Button> */}
                                    <ViewReplyModal/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            }
            {/* ===== 문의 답변 출력 부분 ===== */}
            </div>
        </div>
    );
}