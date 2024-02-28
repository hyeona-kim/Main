"use client"
import EditModal from "@/component/EditModal";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function myPage() {
    const [courseAr, setCourseAr] = useState([]);
    const api_uri = "/login/myCourse";
    const m_id = sessionStorage.getItem("m_id");

    useEffect(function() {
        axios.get(
            api_uri+"?m_id="+m_id
        ).then(json => {
            setCourseAr(json.data.ar);
        }); 
    },[]);

    return (
        <div className="wrapper">
            <div className="edit-myinfo-btn">
                <EditModal/>
            </div>
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
                                    <td>{list.c_name}</td>
                                    <td rowSpan={3}>
                                        비고
                                    </td>
                                </tr>
                                <tr>
                                    <th className="font-bold font-size-17">교육기간</th>
                                    <td>{list.start_date} ~ {list.end_date}</td>
                                </tr>
                                <tr>
                                    <th className="font-bold font-size-17">교육요일</th>
                                    <td>{list.c_day}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={3}> 
                                        <Button variant="contained" color="success">신청</Button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    ))}
                </div>
            }
            {/* ===== 해당 교육과정 출력 부분 ===== */}
        </div>
    );
}