"use client"
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Exam(props) {
    const s_idx = `${props.params.idx}`;
    const [title,setTitle] = useState('');
    const router = useRouter();
    const [answer, setAnswer] = useState([]);
    const [mcAr, setMcAr] = useState([]);
    const [saAr, setSaAr] = useState([]);
    var option = [];
    
    function answerSubmit() {
        let ar = new Array();
        const input_answer = document.getElementsByClassName("answer");
        for(let i=0; i<input_answer.length; i++) {
            ar.push(input_answer[i].value);
        }
        setAnswer(ar);
        axios.post(
            "/login/answerSubmit",
            null,
            {params:{ar : ar.join(",")}}
        ).then(json => {
            console.log("갔다옴")
        });
    }

    useEffect(() => {
        // 처음에 axios 통신으로 객관식, 주관식 문제 배열로 받아서 useState해야함
        axios.get(
            "/login/myExam?s_idx="+s_idx
        ).then(json => {
            console.log(json.data);
            setMcAr(json.data.mc_ar);
            setSaAr(json.data.sa_ar);
            setTitle(json.data.mc_ar[0].s_title);
        });
    }, []);

    return(
        <div className="exam-wrapper">
            <div className="exam-box">
                <div className="ict-logo">
                    <h1>{title}</h1>
                </div>
                {/* ============ 객관식 문제 출력 부분 ============ */}
                {
                mcAr === null
                ?   <div className="my-course-table">
                        <table>
                            <tbody><tr><td className="font-center">객관식 문제가 없습니다.</td></tr></tbody>
                        </table>
                    </div>
                :   <div>
                        {mcAr.map((list, index) => (
                            <table className="exam-table" key={list.qt_idx}>
                                <caption>평가 테이블</caption>
                                <tbody id="exam-tbody">
                                    <tr>
                                        <td><span style={{color: "red"}}>객관식 문제{index+1}.</span> {list.qt_name}</td>
                                    </tr>
                                    <tr>
                                        <td>{list.qt_content}&nbsp;&nbsp;&nbsp;({list.qt_score}점)</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            (왼쪽부터 1번)&nbsp;&nbsp;&nbsp;{list.qt_select}
                                            {/* {list.qt_select.split('│').map((option) => (
                                                {option}
                                            ))} */}
                                        </td>
                                    </tr>
                                    <tr>
                                    <td><input className="answer" placeholder="정답 입력"/></td>
                                    </tr>
                                </tbody>
                            </table>
                        ))}
                    </div> 
                }
                {/* ============ 객관식 문제 출력 부분 ============ */}
                {/* ============ 주관식 문제 출력 부분 ============ */}
                {
                saAr === null
                ?   <div className="my-course-table">
                        <table>
                            <tbody><tr><td className="font-center">주관식 문제가 없습니다.</td></tr></tbody>
                        </table>
                    </div>
                :   <div>
                        {saAr.map((list, index) => (
                        <table className="exam-table">
                            <caption>평가 테이블</caption>
                            <tbody id="exam-tbody">
                                <tr>
                                    <td><span style={{color: "red"}}>주관식 문제{index+1}.</span> {list.qt_name}&nbsp;&nbsp;&nbsp;({list.qt_score}점)</td>
                                </tr>
                                <tr>
                                    <td>{list.qt_content}</td>
                                </tr>
                                <tr>
                                    <td><input className="answer" placeholder="정답 입력"/></td>
                                </tr>
                            </tbody>
                        </table>
                        ))}
                    </div>
                }
                {/* ============ 주관식 문제 출력 부분 ============ */}
                <Button variant="contained" color="primary" className="submit-btn" style={{marginBottom: "20px", marginTop: "10px"}} onClick={() => answerSubmit()}>제출</Button>
            </div>
        </div>
    );
}