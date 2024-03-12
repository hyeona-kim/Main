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

export default function ViewReplyModal(props) {
    const [open, setOpen] = useState(false);
    const idx = `${props.idx}`;
    const handleOpen = () => {
        setOpen(true);
        axios.get(
            "/login/getReply?ac_idx="+idx
        ).then((json) => {
            setReplyAr(json.data.replyAr);
        });
    };
    const handleClose = () => setOpen(false);
    const [replyAr, setReplyAr] = useState([]);

    return (
        <>
        <Button variant='contained' color='info' onClick={handleOpen}>답변확인</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {/* ===== 문의 답변 출력 부분 ===== */}
                {replyAr.map((list) => (
                    <div key={list.ac_idx}>
                    {
                        list.ac_answer === null
                        ?   <div className="my-course-table">
                                <table>
                                    <tbody><tr><td className="font-center">답변이 아직 없습니다.</td></tr></tbody>
                                </table>
                            </div>
                        :   <div>
                                <table className='subjectModal-table' style={{border: "1px solid #dedede"}}>
                                    <thead>
                                        <tr>
                                            <th>답변 작성일</th>
                                            <td>{list.ac_answer_date}</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{backgroundColor: "#fff"}}>
                                            <th>답변 내용</th>
                                            <td>{list.ac_answer}</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr className='align-center'>
                                            <td colSpan={2}><Button variant='contained' color='info' onClick={handleClose}>닫기</Button></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                    }
                    </div>
                ))}
            </Box>
        </Modal>
        </>
    );
}