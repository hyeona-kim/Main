import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

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
  border: 1px solid #5DBA40;
  padding: 15px;
  color: #5DBA40;
  border-radius: 30px;
  cursor: grab;
  font-size: 17px;
`;

export const ExitBtn = styled(ModalBtn) `
background-color : #4000c7;
border : none;
border-radius: 10px;
text-decoration: none;
margin: 10px;
padding: 5px 10px;
width: 40px;
height: 40px;
display : flex;
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
  flex-direction: column;
  border-radius: 20px;
  width: 500px;
  heigth: 200px;
  background-color: #ffffff;
    >div.desc {
      margin: 50px;
      font-size: 20px;
      color: var(--coz-purple-600);
    }
`;

export default function EditModal() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const openModalHandler = () => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen(!isOpen) 
    };

    function checkSamePw() {
        const m_id = sessionStorage.getItem("m_id");
        const m_pw = document.getElementById("m_pw").value;
        if(!m_pw.trim().length > 0) {
            alert("비밀번호를 입력하세요 (공백제외)");
            return;
        }
        axios.get(
            "/login/checkSamePw?m_id="+m_id+"&m_pw="+m_pw
        ).then(json => {
            if(json.data.flag) {
                router.push("/editMyInfo");
            }else{
                alert("비밀번호를 잘못 입력하셨습니다.")
                return;
            }
        });
    }

    return(
        <>
            <ModalContainer>
                <ModalBtn onClick={openModalHandler}
                // 클릭하면 Modal이 열린 상태(isOpen)를 boolean 타입으로 변경하는 메소드가 실행되어야 합니다. 
                > 내정보 수정
                    {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때는 ModalBtn의 내부 텍스트가 'Opened!' 로 Modal이 닫힌 상태(isOpen이 false인 상태)일 때는 ModalBtn 의 내부 텍스트가 'Open Modal'이 되도록 구현 */}
                </ModalBtn>
                {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때만 모달창과 배경이 뜰 수 있게 구현 */}
                {isOpen ? 
                <ModalBackdrop onClick={openModalHandler}>
                    {/* event 버블링을 막는 메소드  */}
                    <ModalView onClick={(e) => e.stopPropagation()}>
                        <ExitBtn onClick={openModalHandler}>x</ExitBtn>
                        <div className='desc'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='font-size-17'>비밀번호 재입력</td>
                                        <td><input type='password' id='m_pw'/></td>
                                    </tr>   
                                    <tr className='align-center'>
                                        <td colSpan={2}><input type='button' onClick={() => checkSamePw()} value="확인"/></td>
                                    </tr>   
                                </tbody>
                            </table>
                        </div>
                    </ModalView>
                    </ModalBackdrop>
                    : null
                }
            </ModalContainer>
        </>
    );
};