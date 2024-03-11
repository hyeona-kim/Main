import { Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import uuid from 'react-uuid';
import { loadTossPayments } from '@tosspayments/payment-sdk';

export const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display : flex;
  justify-content : right;
  align-items : center;
  height : 100%;
`;

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
`;

export const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  color: #fff;
  border-radius: 30px;
  cursor: grab;
  font-size: 15px;
  width: 60px;
  height: 25px;
`;

export const ExitBtn = styled(ModalBtn) `
background-color : #4000c7;
border : none;
border-radius: 10px;
text-decoration: none;
margin: 5px;
padding: 5px 5px;
width: 40px;
height: 40px;
display : inline-block;
justify-content : center;
align-items : center;
color: white;
`;

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
  role: 'dialog',
}))`
  // Modal창 CSS를 구현합니다.
  display: flex;
  align-items: center;
  text-align: right;
  flex-direction: column;
  border-radius: 20px;
  width: 1000px;
  padding: 10px 0;
  background-color: #ffffff;
    >div.desc {
      margin: 50px;
      font-size: 20px;
      color: var(--coz-purple-600);
    }
`;

export default function TrainingBookModal({ar}) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const clientKey = "test_ck_26DlbXAaV0LvvbajpNY5VqY50Q9R";
    const openModalHandler = () => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen(!isOpen) 
    };

    // [결제] 클릭했을 때 결제창으로 가는 기능
    const goTossPayment = (index) => {
        loadTossPayments(clientKey).then(tossPayments => {
          tossPayments.requestPayment('카드', {
            amount: ar[index].tb_price,
            orderId: uuid(), // 대충 날짜를 조합하든가 uuid를 사용하는 방법도..
            orderName: ar[index].tb_title,
            customerName: sessionStorage.getItem("m_name"),
            successUrl: "/myPage", // ${결제 성공 후 redirect할 url}
            failUrl:"/", //  ${결제 실패한 경우 redirect할 url}
          })
          .catch(function (error) {
            if (error.code === 'USER_CANCEL') {
              // 결제 고객이 결제창을 닫았을 때 에러 처리
              alert("결제를 취소하셨습니다.");
              router.push("/myPage");
            } else if (error.code === 'INVALID_CARD_COMPANY') {
              // 유효하지 않은 카드 코드에 대한 에러 처리
            }
          })
        })
    };

    return(
        <>
            <ModalContainer>
                <ModalBtn onClick={openModalHandler}
                // 클릭하면 Modal이 열린 상태(isOpen)를 boolean 타입으로 변경하는 메소드가 실행되어야 합니다. 
                > 교재목록
                    {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때는 ModalBtn의 내부 텍스트가 'Opened!' 로 Modal이 닫힌 상태(isOpen이 false인 상태)일 때는 ModalBtn 의 내부 텍스트가 'Open Modal'이 되도록 구현 */}
                </ModalBtn>
                {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때만 모달창과 배경이 뜰 수 있게 구현 */}
                {isOpen ? 
                <ModalBackdrop onClick={openModalHandler}>
                    {/* event 버블링을 막는 메소드  */}
                    <ModalView onClick={(e) => e.stopPropagation()}>
                        <ExitBtn onClick={openModalHandler}>X</ExitBtn>
                    {/* ===== 해당 교재 출력 부분 ===== */}
                    {
                    // 삼항 연산자를 이용하여 검색내용이 비었을 때 다르게 표시
                    ar === null
                    ?   <div className="course-table" style={{width: '80%'}}>
                            <table>
                                <tbody><tr><td className="font-center" style={{color: '#666f77', fontSize: '15px'}}>해당 교재가 없습니다.</td></tr></tbody>
                            </table>
                        </div>
                    :   <div className="book-List-wrapper">
                            <div>
                                <table id="book-List-table">
                                    <colgroup>
                                        <col width="40%"/>
                                        <col width="20%"/>
                                        <col width="20%"/>
                                        <col width="20%"/>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th className="font-bold font-size-17">교재명</th>
                                            <th className="font-bold font-size-17">저자</th>
                                            <th className="font-bold font-size-17">출판사</th>
                                            <th className="font-bold font-size-17">가격</th>
                                            <th className="font-bold font-size-17">결제</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {ar.map((list, index) => (
                                        <tr key={list.tb_idx}>
                                            <td>{list.tb_title}</td>
                                            <td>{list.tb_writer}</td>
                                            <td>{list.tb_publisher}</td>
                                            <td>{list.tb_price}원</td>
                                            <td><Button variant="contained" color="info" onClick={() => goTossPayment(index)}>결제</Button></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                    {/* ===== 해당 교재 출력 부분 ===== */}
                    </ModalView>
                    </ModalBackdrop>
                    : null
                }
            </ModalContainer>
        </>
    );
};