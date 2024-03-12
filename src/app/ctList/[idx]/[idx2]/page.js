"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import TrainingBookModal from "@/component/TrainingBookModal";

export default function ctList(props) {
    // uri에 변수를 사용하기 위해 그레이브(`) 사용해야한다
    const idx2 =  props.params.idx2;
    const idx3 = Number(idx2);
    const api_uri = `/login/ctList?ct_idx=${props.params.idx}`; 
    const api_uri2 = '/login/getCtList';
    const [courseAr, setCourseAr] = useState([]);
    const [courseTypeAr, setCourseTypeAr] = useState([]);
    const [bookAr, setBookAr] = useState([]);
    const ct_idx = `${props.params.idx}`;
    const router = useRouter();

    const [idx, setValue] = React.useState(0);

    // const handleChange = (event, idx) => {
    //     setValue(idx);
    // };

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


    // 해당 과정에 속하는 과목 목록 가져오는 기능
    function getList() {
        axios.get(
            api_uri,
        ).then((json) => {
            setCourseAr(json.data.courseAr);
        });
    };
        
    useEffect(() => {
    }, [courseAr]);
    // 위에 탭 넣기위해 교육과정 목록 가져오는 기능
    function getCourseTypeList(){
        axios.get(
            api_uri2,
        ).then(json => {
            setCourseTypeAr(json.data.courseTypeAr);
        });
    };

    // 탭 눌렀을때 이동하는 기능
    function goPage(idx,index) {
        router.push("/ctList/"+idx+"/"+index);
    };

    // [검색]할때 오류 안나게 최상위 컴포넌트로 만드는 함수
    function reSetList(data){
        setCourseAr(data);
    }

    // [검색] 버튼 클릭해서 검색하는 기능
    function searchCourse() {
        const name = document.getElementById("c_name").value;
        if(name.trim().length > 0) {
            axios.get(
                "/login/searchCourse?c_name="+name+"&ct_idx="+ct_idx,
            ).then((json) => {
                reSetList(json.data.CourseAr);
            });
        }else {
            alert("검색할 과정명을 입력하세요");
            return;
        }
    };

    // 교육과정에서 [신청] 버튼 클릭시 이동하는 기능
    function goEnroll(c_idx) {
        if(sessionStorage.getItem("memberVo") === null) {
            router.push("/signUp");
            return;
        }else{
            const check = sessionStorage.getItem("tr_idx");
            
            // 이미 수강중인 과정이 있으면 신청 페이지 block
            if(check === 'undefined' || check === null){
                router.push("/enroll/"+c_idx);
            }else {
                alert("이미 수강중인 과정이 있습니다.");
                return;
            }
        }
    };

    // 교육과정에서 [상담] 버튼 클릭시 이동하는 기능
    function goCounsel() {
        router.push("/online");
    };

    // 교육과정에서 [문의] 버튼 클릭시 이동하는 기능
    // c_idx는 일단 받아둔거 - 나중에 필요하면 쓰고 아니면 지우기
    function goAsk(c_idx) {
        if(sessionStorage.getItem("memberVo") === null) {
            router.push("/signUp");
            return;
        }else{
            // 문의 후 원래 보던 페이지로 가기위해 저장
            sessionStorage.setItem('ct_idx', ct_idx);
            router.push("/ask?idx3="+idx3);
        }
    };

    // [교재목록] 클릭시 목록 반환하는 기능
    function trBookList(idx) {
        axios.get(
            "/login/trBookList?c_idx="+idx
        ).then((json) => {
            setBookAr(json.data.ar);
        });
    };

    useEffect(() => {
        getList();
        getCourseTypeList();
    }, []);

    return(
        <>
            <div className="courseTypeList-wrapper">
                {/* ===== 위쪽 교육과정 목록 탭 부분 ===== */}
                <div className="courseTypeList-box">
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 2, borderColor: 'divider'}}>
                        <Tabs value={idx3}  aria-label="basic tabs example" variant="fullWidth" centered>
                            {courseTypeAr.map((list,index) => (
                                <Tab key={list.ct_idx} onClick={()=>goPage(list.ct_idx,index)} label={list.ct_name}  />
                            ))}
                        </Tabs>
                    </Box>
                </Box>
                </div>
                {/* ===== 위쪽 교육과정 목록 탭 부분 ===== */}

                {/* ===== 검색 기능 테이블 부분 ===== */}
                <div className="search-course-table">
                    <form>
                        <table>
                            <colgroup>
                                <col width="90%"/>
                                <col width="10%"/>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td><input type="text" id="c_name" placeholder="과정명"/></td>
                                    <td><Button variant="contained" color="primary" onClick={searchCourse}>검색</Button></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                {/* ===== 검색 기능 테이블 부분 ===== */}

                {/* ===== 해당 교육과정 출력 부분 ===== */}
                {
                // 삼항 연산자를 이용하여 검색내용이 비었을 때 다르게 표시
                courseAr === null
                ?   <div className="course-table">
                        <table>
                            <tbody><tr><td className="font-center">해당 과정이 없습니다.</td></tr></tbody>
                        </table>
                    </div>
                :   <div>
                        {courseAr.map((list) => (
                        <div className="course-table" key={list.c_idx}>
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
                                            <Button variant="contained" color="success" onClick={() => goEnroll(list.c_idx)}>신청</Button>
                                            <Button variant="contained" color="info" onClick={() => goAsk(list.c_idx)}>문의</Button>
                                            <Button variant="contained" color="secondary" onClick={goCounsel}>상담</Button>
                                            <Button variant="contained" color="success" onClick={() => trBookList(list.c_idx)}><TrainingBookModal ar={bookAr}/></Button>
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
        </>
    );
}