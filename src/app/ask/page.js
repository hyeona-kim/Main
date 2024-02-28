"use client"
import '../../css/style.css'
import '../../css/skel.css'
import '../../css/style-xlarge.css'
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ask(props) {
    const router = useRouter();
    const idx = sessionStorage.getItem('ct_idx');
    const api_uri = '/login/addAsk';

    // [등록] 버튼을 클릭했을 때 수행하는 함수
    function addAsk(){
        const title = document.getElementById("ask-title").value;
        const content = document.getElementById("ask-content").value;
        if(!title.trim().length > 0) {
            alert("제목을 입력하세요");
            return;
        }
        if(!content.trim().length > 0) {
            alert("내용을 입력하세요");
            return;
        }
        axios.get(
            api_uri+"?ac_title="+title+"&ac_content="+content,
        ).then(json => {
            router.push("/ctList/"+idx);
            sessionStorage.removeItem("ct_idx");
        });
    }

    return(
        <div className="ask-wrapper">
            <div className="ask-box">
                <div className="ict-logo">
                    <h1>문의하기</h1>
                </div>
                <table className="ask-table">
                    <caption>문의하기 Form 테이블</caption>
                    <tbody id="ask-tbody">
                        <tr>
                            <td><input type="text" id="ask-title" placeholder="제목 입력"/></td>
                        </tr>
                        <tr>
                            <td><textarea id="ask-content" placeholder="내용 입력" rows={7}/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button className="font-bold font-size-17" onClick={addAsk}>등록</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
}