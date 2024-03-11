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

export default function ViewReplyModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [replyAr, setReplyAr] = useState([]);
    const api_uri = "/login/myReply";

    useEffect(function() {
        axios.get(
            api_uri+"?m_id="+sessionStorage.getItem("m_id")
        ).then(json => {
            setReplyAr(json.data.ar);
        }); 
    },[]);

    return (
        <>
        <Button variant='contained' color='info' onClick={handleOpen}>답변</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {/* ===== 문의 답변 출력 부분 ===== */}
                {replyAr.map((list) => (
                <div>
                    <table className='subjectModal-table' key={list.ac_idx}>
                        <thead>
                            <tr>
                                <th>답변 작성일</th>
                                <td>{list.ac_answer_date}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={2}>{list.ac_answer}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2}><Button variant='contained' color='info' onClick={handleClose}>닫기</Button></td>
                            </tr>
                        </tfoot>
                        </table>
                    </div>
                ))}
            </Box>
        </Modal>
        </>
    );
}