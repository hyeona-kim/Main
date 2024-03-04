"use client"
import Banner from "@/component/Banner";
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
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function Qna(props) {
   
    function createData(name, calories, fat, carbs, protein, price) {
        return {
          name,
          calories,
          fat,
          carbs,
          protein,
          price,
          history: [
            {
              date: '2020-01-05',
              customerId: '11091700',
              amount: 3,
            },
            {
              date: '2020-01-02',
              customerId: 'Anonymous',
              amount: 1,
            },
          ],
        };
      }

      const { row } = props;
      const [open, setOpen] = React.useState(false);
    
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    const m_idx = `${props.params.m_idx}`
    const vo = sessionStorage.getItem("m_id");
    const [mem, setMem] = useState([]);
    const api_uri = "/login/getmemberVO";
    const router = useRouter();

    function cheackedlogin() {
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

//     const { page } = router.query;
//     const [products, setProducts] = useState < Product[] > ([]);

//     // 컨텐츠 데이터를 불러오는 함수
//     const fetchProducts = async (page: m_idx) => {
//     ...
// };

// //  페이지 버튼 클릭 시 url 변경
// const handleChangePage = (page: number) => {
//     router.push(`pagination?page=${page}`, undefined, { shallow: true, scroll: true });
// };

// useEffect(() => {
//     // 페이지 변경 시 
//     if (!page) return;
//     setCurrentPage(Number(page)); // 현재 페이지 상태 변경 -> Pagination리렌더링
//     fetchProducts(Number(page));  // 컨텐츠 데이터 새롭게 불러와 상태 변경 -> ProductList리렌더링
// }, [page]);





return (
    <>
        <Banner />
        <div className="container">
            <div className="row">
                <div className="12u">
                    <header>
                        <h1 style={{ textAlign: 'center' }}>Q&A</h1>
                        <p style={{ textAlign: 'right' }}><Button onClick={cheackedlogin}>글쓰기</Button></p>
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