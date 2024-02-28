import Banner from "@/component/Banner";
import Blank from "@/component/Blank";

export default function Qna() {
    return (
        <>
        <Banner/>
        <Blank/>
            <div className="container">
                <section>
                    <table>
                        <thead>
                            <tr>
                                <th>순번</th>
                                <th>제목</th>
                                <th>작성자 </th>
                                <th>등록일</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                    </table>
                </section>
                <hr className="major" />
            </div>
        </>
    );
}