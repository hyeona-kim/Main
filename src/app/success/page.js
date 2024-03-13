'use client'
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [data1, setData1] = useState([]); 
  const [str1, setStr1] = useState("");
  const [str2, setStr2] = useState("");
  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.  
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    async function confirm() {
      const response = await fetch("/toss/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();
      console.log(json);
      setData1(json);
    }
    confirm();
  }, []);
  useEffect(() => {
    let str1 = String(data1.orderId);
    let str2 = String(data1.requestedAt);
    let ar = str1.split('_');
    str2 = str2.substring(0, 10);
    setStr1(ar[1]);
    setStr2(str2);
  },[data1]);

    return (
        <div>
            <div className="my-course-table">
                <header>
                    <h2>결제가 완료되었습니다.</h2>
                </header>
                <table>
                    <colgroup>
                        <col width="30%"/>
                        <col width="70%"/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th className="font-bold font-size-17">주문번호</th>
                            <td>{str1}</td>
                        </tr>
                        <tr>
                            <th className="font-bold font-size-17">상품명</th>
                            <td>{data1.orderName}</td>
                        </tr>
                        <tr>
                            <th className="font-bold font-size-17">결제금액</th>
                            <td>{data1.totalAmount}원</td>
                        </tr>
                        <tr>
                            <th className="font-bold font-size-17">결제 승인일</th>
                            <td>{str2}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3}> 
                                <a href="/myPage"><button>돌아가기</button></a>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}