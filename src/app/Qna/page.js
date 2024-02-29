"use client"
import Banner from "@/component/Banner";
import Blank from "@/component/Blank";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

export default function Qna() {



    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    // const api_uri = "/bbs/list";

    // 스프링서버로 부터 화면에 표현할 목록들을 받는 메서드 
    // function getList(){
    //     axios.get(api_uri, {params:{cPage:currentPage}}
    //         ).then((jsonData)=>{
    //             setList(jsonData.data.ar);
    //         })

    // }

    // useEffect(()=>{
    //     getList(); //페이지가 로드 될때 한번 호출
    // });


    return (
        <>
        <Banner/>
            <div className="container">
                <div className="row">
                    <div className="9u">
                        <header>
                            <h1>Q&A</h1>
                            <p><a href="/write" variant="contained" ><Button>글쓰기</Button></a></p>
                        </header>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
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
                                            <TableCell align="right">{row.subject}</TableCell>
                                            <TableCell align="right">{row.writer}</TableCell>
                                            <TableCell align="right">{row.write_date}</TableCell>
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