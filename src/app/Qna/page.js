"use client"

import Blank from "@/component/Blank";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Banner from "@/component/banner";
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function Qna(props) {
    // 글 목록 가져오기
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const api_uri2 = "/login/qna/getqnaList";

    // 로그인 하고 session에 담겨있는 m_id를 가지고 글쓰기 가능하게 할때 쓰임 
    const m_idx = `${props.params.m_idx}`
    const vo = sessionStorage.getItem("m_id");
    const [mem, setMem] = useState([]);
    const api_uri = "/login/getmemberVO";
    const router = useRouter();

    // 글쓰기
    function cheakedlogin() {
        axios.get(
            api_uri + "?m_id=" + vo
        ).then((json) => {
            console.log(json.data.ar);
            setMem(json.data.ar);
            if (vo === null || vo === 'null') {
                router.push("/Qna");
            } else {
                console.log(vo);
                router.push("/write?m_id=" + vo);
            }

        });
    }
   
    // 테이블에 표현할 목록들 가져오기
    function getList() {
        axios.get(api_uri2, { params: { cPage: currentPage } }
        ).then((jsonData) => {
          setList(jsonData.data.ar);
        })
    
      }

    useEffect(() => {
        getList(); //페이지가 로드 될때 한번 호출
      },[]);


    return (
        <>
            <Banner />
            <div className="container">
                <div className="row">
                    <div className="12u">
                        <header>
                            <h1 style={{ textAlign: 'center' }}>Q&A</h1>
                            <p style={{ textAlign: 'right' }}><Button onClick={cheakedlogin}>글쓰기</Button></p>
                        </header>
                        <TableContainer component={Paper}>
                            <Table aria-label="qna table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>번호</TableCell>
                                        <TableCell align="right">제목</TableCell>
                                        <TableCell align="right">글쓴이</TableCell>
                                        <TableCell align="right">등록일</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {list.map((row, i) => (
                                        <TableRow
                                            key={i}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {i + 1}
                                            </TableCell>
                                            <TableCell align="right" ><a href={'/view/'+row.qna_idx}>{row.qna_title}</a></TableCell>
                                            <TableCell align="right">{row.qna_writer}</TableCell>
                                            <TableCell align="right">{row.qna_write_date}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                </div>
            </div>
        </>
    );

}