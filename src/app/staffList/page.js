"use client"
import Banner from "@/component/banner";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function staffList() {
    const [ar, setAr] = useState([]);
    const api_uri = '/login/getSfList';

    function getStaffList() {
        axios.get(
            api_uri,
        ).then(json => {
            setAr(json.data.ar);
        });
    };

    useEffect(() => {
        getStaffList();
    },[]);
    
    return (
        <>
        <Banner/>
        <div className="staffList-wrapper">
            <article>
                <h1>강사진 소개</h1>
            </article>
            <div id="staffList-box">
                <table className="staffList-table">
                    <caption>강사진 소개 테이블</caption>
                    <tbody id="staffList-tbody">
                        {ar.map((list) => (
                            <div style={{border:"1px solid #ababab", marginTop:"10px"}}>
                            <table key={list.sf_idx} style={{}}>
                                <colgroup>
                                    <col width={"20%"}/>
                                    <col width={"10%"}/>
                                    <col width={"70%"}/>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td>{list.sf_name}</td>
                                        <td colSpan={2}>이메일 : {list.sf_email}</td>
                                    </tr>
                                    <tr>
                                        <td><img className="staff-img" src={'http://localhost:8080'+list.img_path}/><br/><br/></td>
                                        <td className="staff-email vertical-top">경력</td>
                                        <td className="vertical-top"><div dangerouslySetInnerHTML={{__html:`${list.sf_career}`}}></div></td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}