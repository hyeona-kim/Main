"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as React from 'react';

export default function editMyInfo() {
    const [memberVo, setMemberVo] = useState([]);
    const m_id = sessionStorage.getItem("m_id");
    const router = useRouter();

    function editInfo() {
        const id = document.getElementById("id").value;
        const pw = document.getElementById("pw").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const name = document.getElementById("name").value;
        const addr = document.getElementById("addr").value;

        // 각 데이터들 유효성 검사
        if(!pw.trim().length > 0) {
            alert("비밀번호를 입력하세요 (공백은 포함되지 않습니다)");
            return;
        }
        if(!name.trim().length > 0) {
            alert("이름을 입력하세요");
            return;
        }
        if(phone.trim().length != 13) {
            alert("연락처를 정확히 입력하세요 (예)010-1234-5678");
            return;
        }
        if(!addr.trim().length > 0) {
            alert("주소를 입력하세요");
            return;
        }

        axios.post(
            "/login/editMyInfo?m_id="+id+
                "&m_pw="+pw+
                "&m_email="+email+
                "&m_phone="+phone+
                "&m_name="+name+
                "&m_addr="+addr
        ).then((json) => {
            router.replace("/myPage");
        });
    };

    function setVo() {
        axios.get(
            "/login/getMember?m_id="+m_id
        ).then((json) => {
            setMemberVo(json.data.memberVo);
        });
    };

    useEffect(() => {
        setVo();
    },[]);

    return(
        <div className="editMyInfo-wrapper">
            <div className="editMyInfo-box">
                <div className="ict-logo">
                    <h1>내정보 수정하기</h1>
                </div>
                <table className="editMyInfo-table">
                    <caption>내정보 수정 테이블</caption>
                    <colgroup>
                        <col width="20%"/>
                        <col width="80%"/>
                    </colgroup>
                    {memberVo.map((vo) => (
                    <tbody id="editMyInfo-tbody" key={vo.m_idx}>
                            <tr>
                                <td><label htmlFor="id">아이디:</label></td>
                                <td><input type="text" id="id" placeholder="아이디" defaultValue={vo.m_id} readOnly/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="pw">비밀번호:</label></td>
                                <td><input type="password" id="pw" placeholder="비밀번호"/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="email">이메일<br/>(선택):</label></td>
                                <td><input type="text" id="email" placeholder="이메일" defaultValue={vo.m_email}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="name">이름:</label></td>
                                <td><input type="text" id="name" placeholder="이름" defaultValue={vo.m_name}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="phone">연락처:</label></td>
                                <td><input type="text" id="phone" placeholder="연락처" defaultValue={vo.m_phone}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="addr">주소:</label></td>
                                <td><input type="text" id="addr" placeholder="주소" defaultValue={vo.m_addr}/></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><button className="font-bold font-size-17" onClick={() => editInfo()}>수정</button></td>
                            </tr>
                    </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
}