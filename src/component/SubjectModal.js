import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #ababab',
    boxShadow: 24,
    p: 4,
};

export default function SubjectModal(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [subjectAr, setSubjectAr] = useState([]);
    const api_uri = "/login/mySubject";
    const router = useRouter();
    const [cnt, setCnt] = useState(0);
    
    function goExam(idx) {
        router.push("/exam/"+idx);
    }

    useEffect(function() {
        axios.get(
            api_uri+"?c_idx="+props.idx
        ).then(json => {
            setSubjectAr(json.data.ar);
            setCnt(json.data.cnt);
        }); 
    },[]);

    return (
        <>
        <Button variant='contained' color='primary' onClick={handleOpen}>평가관리</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {/* ===== 해당 과목 출력 부분 ===== */}
                {
                // 삼항 연산자를 이용하여 검색내용이 비었을 때 다르게 표시
                subjectAr === null
                ?   <div className="my-course-table">
                        <table>
                            <tbody><tr><td className="font-center">해당 과목이 없습니다.</td></tr></tbody>
                        </table>
                    </div>
                :   <div>
                        <table className='subjectModal-table align-center'>
                            <thead>
                                <tr>
                                    <td>과목명</td>
                                    <td>능력단위명</td>
                                    <td>분류</td>
                                    <td>강사명</td>
                                    <td>평가</td>
                                </tr>
                            </thead>
                            <tbody>
                            {subjectAr.map((list) => (
                                <tr key={list.s_idx}>
                                    <td>{list.s_title}</td>
                                    <td>{list.us_name}</td>
                                    <td>{list.s_type}</td>
                                    <td>{list.sf_name}</td>
                                    {
                                        list.evo === null
                                        ?
                                        <td></td>
                                        :
                                        <td><Button variant="contained" color="primary" onClick={() => goExam(list.s_idx)}>평가</Button></td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5}><Button variant='contained' color='info' onClick={handleClose}>취소</Button></td>
                            </tr>
                        </tfoot>
                        </table>
                    </div>
                }
                {/* ===== 해당 과목 출력 부분 ===== */}
            </Box>
        </Modal>
        </>
    );
}