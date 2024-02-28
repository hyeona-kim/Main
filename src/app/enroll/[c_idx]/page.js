"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Enroll(props) {
    const c_idx = `${props.params.c_idx}`
    const router = useRouter();
    const [courseAr, setCourseAr] = useState([]);
    const api_uri = "/login/getCourseVO";
    const enroll_api_uri = "/login/enrollCourse";

    function getCourseVO() {
        axios.get(
            api_uri+"?c_idx="+c_idx
        ).then((json) => {
            setCourseAr(json.data.ar);
        });
    };

    function enrollCourse() {
        const tr_name = document.getElementById("tr_name").value;
        const tr_phone = document.getElementById("tr_phone").value;
        const tr_rrn = document.getElementById("tr_rrn").value;
        const tr_addr = document.getElementById("tr_addr").value;

        // 입력사항들 유효성 검사
        if(tr_name.trim().length <= 0) {
            alert("이름을 정확히 입력해주세요.");
            return;
        }
        if(tr_phone.trim().length != 13) {
            alert("연락처를 정확히 입력해주세요 예(010-1234-5678)");
            return;
        }
        if(tr_rrn.trim().length != 14) {
            alert("주민등록번호를 정확히 입력해주세요 예(111111-2222222)");
            return;
        }
        if(tr_addr.trim().length <= 0) {
            alert("주소를 정확히 입력해주세요.");
            return;
        }

        axios.get(
            enroll_api_uri+"?tr_name="+tr_name+
                        "&tr_phone="+tr_phone+
                        "&tr_rrn="+tr_rrn+
                        "&tr_addr="+tr_addr+
                        "&c_idx="+c_idx
        ).then((json) => {
            // 저장한 tr_idx를 다시 받아서 sessionStorage에 저장
            sessionStorage.setItem("tr_idx", json.data.tr_idx);
            router.replace("/myPage");
        });
    };

    useEffect(() => {
        getCourseVO();
    }, []);

    return(
        <div className="enroll-wrapper">
            <div className="enroll-box">
                <div className="ict-logo">
                    <h1>과정 수강신청</h1>
                </div>
                <table className="enroll-table">
                    <caption>과정 수강신청 테이블</caption>
                    <colgroup>
                        <col width="20%"/>
                        <col width="80%"/>
                    </colgroup>
                    {courseAr.map((vo) => (
                    <tbody id="enroll-tbody" key={vo.c_idx}>
                            <tr>
                                <td><label htmlFor="c_name">과정명:</label></td>
                                <td className="align-left"><span id="c_name">{vo.c_name}</span></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="period">기간:</label></td>
                                <td className="align-left"><span id="period">{vo.start_date+" ~ "+vo.end_date}</span></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="staff">강사:</label></td>
                                <td className="align-left"><span id="staff">{vo.svo.sf_name}</span></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="peo_num">총 수강인원:</label></td>
                                <td className="align-left"><span id="peo_num">{vo.c_peo_num}</span></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="day">수업요일:</label></td>
                                <td className="align-left"><span id="day">{vo.c_day}</span></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="tr_name">이름:</label></td>
                                <td><input type="text" id="tr_name" placeholder="이름"/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="tr_phone">연락처:</label></td>
                                <td><input type="text" id="tr_phone" placeholder="연락처 예(010-1234-5678)"/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="tr_rrn">주민등록번호:</label></td>
                                <td><input type="text" id="tr_rrn" placeholder="주민등록번호 예(111111-2222222)"/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="tr_addr">주소:</label></td>
                                <td><input type="text" id="tr_addr" placeholder="주소 예(서울시 동대문구 광진동 149-40)"/></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><button className="font-bold font-size-17" onClick={() => enrollCourse()}>신청</button></td>
                            </tr>
                    </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
}