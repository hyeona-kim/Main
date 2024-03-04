"use client"
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Banner from '@/component/Banner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';



function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.writer}123</TableCell>
                <TableCell align="right">{row.write_date}</TableCell>
            </TableRow>



            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                답변
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                {/* hide로 숨겨진 테이블  th 부분 */}
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>작성자</TableCell>
                                        <TableCell align='center'>답변</TableCell>
                                        <TableCell align="center">등록일</TableCell>
                                    </TableRow>
                                </TableHead>
                                {/* hide로 숨겨진 테이블 td 부분 */}
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell align="center" component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell align="center">{historyRow.customerId}</TableCell>
                                            <TableCell align="center">{historyRow.amount}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};



export default function CollapsibleTable(props) {

    const api_uri = '/login/getqnaList'

    const [qnaAr,setQnaAr] = useState([]);
    const [comAr,setComAr] = useState([]);
    const [ar,setAr] = useState([]);

    const qna_idx = `${props.params.idx}`;
    const router = useRouter();
    
    function getqnaList(){
        axios.get(
            api_uri,
        ).then(json =>{
            setAr(json.data.qnaAr);
        });
    }


    useEffect(() => {

		getqnaList();
	}, []);

    return (
        <div>
            <Banner />

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="left">질문</TableCell>
                            <TableCell align="center">작성자</TableCell>
                            <TableCell align="right">등록일</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {qnaAr.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );


}