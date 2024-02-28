"use client"
import Banner from "@/component/Banner";
import axios from "axios";
import { useEffect, useState } from "react";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from "next/navigation";
import { Button, Radio, RadioGroup } from "@mui/material";
import Blank from "@/component/Blank";


export default function online(props) {
    // const today = new Date();
    // const formattedYear = today.getFullYear().toString().slice(-2);
    // const formattedFull = `${formattedYear}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;


    // 온라인 상담 신청 form을 서버로 보내기 위한 함수 
    function handleData() {
        const api_uri = "/login/online/add";
        const formData = new FormData();


        let ac_name = document.getElementById("ac_name");
        let ac_email = document.getElementById("ac_email");
        let ac_phone = document.getElementById("ac_phone");
        let ac_content = document.getElementById("ac_content");
        let ac_gender = document.getElementsByName("ac_gender")

        formData.append("ac_name", ac_name.value);
        formData.append("ac_email", ac_email.value);
        formData.append("ac_phone", ac_phone.value);
        formData.append("ac_content", ac_content.value);
        formData.append("ac_gender", ac_gender.value);
        s
        //비동기식 통신
        axios.post(
            api_uri, formData, { headers: { "Content-Type": 'multipart/form-data', } }
        ).then((res) => {
            console.log("Res:" + res.data.res);
        });
        location.href = "/online";

    }


    // uri에 변수를 사용하기 위해 그레이브(`) 사용해야한다
    const [idx, setValue] = React.useState(0);
    const [courseAr, setCourseAr] = useState([]);
    const [idx2, setIdx2] = React.useState(1);
    const api_uri = `/login/ctList`;
    const api_uri2 = '/login/getCtList';
    const [courseTypeAr, setCourseTypeAr] = useState([]);
    const router = useRouter();


    const handleChange = (event, idx) => {
        setValue(idx);

    };

    function CustomTabPanel(props) {
        const { children, idx, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={idx !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {idx === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    };

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    // 해당 과정에 속하는 과목 목록 가져오는 기능
    function getList(ct_idx) {
        axios.get(
            api_uri, { params: { 'ct_idx': ct_idx } }
        ).then((json) => {
            setCourseAr(json.data.courseAr);
            console.log(json);
        });
    };

    // 위에 탭 넣기위해 교육과정 목록 가져오는 기능
    function getCourseTypeList() {
        axios.get(
            api_uri2,
        ).then(json => {
            setCourseTypeAr(json.data.courseTypeAr);
        });
    };

    // 탭 눌렀을때 이동하는 기능
    function goPage(idx) {
        console.log(idx);
        setIdx2(idx);
        getList(idx);
    };


    useEffect(() => {
        getList(idx2);
        getCourseTypeList();
    }, []);

    return (
        <>
            <Banner />

            <div className="container">
                <hr />
                <div className="row">
                    <div className="6u">

                        <div>
                            <h3 style={{ textAlign: 'center' }}>교육과정 목록</h3>
                            <div className="courseTypeList-wrapper">
                                <div className="courserTypeList-box">
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                                            <Tabs value={idx} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth" centered>
                                                {courseTypeAr.map((list) => (
                                                    <Tab key={list.ct_idx} label={list.ct_name} onClick={() => goPage(list.ct_idx)}  {...a11yProps(list.ct_idx)} />
                                                ))}
                                            </Tabs>
                                        </Box>
                                    </Box>
                                </div>
                            </div>  {/* 목록 탭 */}
                            <div>
                                {courseAr && courseAr.map((list) => (
                                    <div className="course-table" key={list.c_idx}>
                                        <table>
                                            <colgroup>
                                                <col width="20%" />
                                                <col width="40%" />
                                                <col width="40%" />
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
                                        </table>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="6u online-table ">
                        <section className="special">
                            <h3>온라인 상담 신청</h3>
                            <div>
                                <form id="frm">
                                    <table>
                                        <caption>온라인 상담 신청 테이블</caption>
                                        <tbody>
                                            <tr>
                                                <td><input type="text" id="ac_name" required placeholder="이름을 입력하세요"></input></td>
                                            </tr>
                                            <tr>
                                                <td><input type="email" id="ac_email" required placeholder="이메일을 입력하세요"></input></td>
                                            </tr>
                                            <tr>
                                                <td><input type="text" id="ac_phone" name="phone" required placeholder="연락처을 입력하세요" /></td>
                                            </tr>
                                            <tr>
                                                <td><textarea id="ac_content" required placeholder="내용을 입력하세요"></textarea></td>
                                            </tr>
                                            {/* <tr>
                                                <td>
                                                    <label>남자</label><input type="radio" name="gender" value={'남자'}/>
                                                    <label>여자</label><input type="radio" name="gender" value={'여자'} />
                                                </td>
                                            </tr><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> */}
                                            <tr>
                                                <td><button type="button" onClick={handleData} className="onlien-btn">저장</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div >
                        </section>
                    </div>
                </div>
            </div>

        </>
    );
}