export default function Login() {
    return(
        <div className="test">
            <div className="test-login">
                <div className="test-logo">
                    <img src="#" alt="Logo"></img>
                </div>
                <form>
                    <table className="login-table">
                        <caption>로그인 Form 테이블</caption>
                        <tbody id="login-tbody">
                            <tr>
                                <td><input type="text" id="login-id-input" name="" placeholder="아이디 입력"></input></td>
                            </tr>
                            <tr>
                                {/* type password여서 나중에 실제 로그인할때 데이터가 정확하게 넘어가는지 체크해야함 */}
                                <td><input type="password" id="login-pw-input" name="" placeholder="비밀번호 입력"></input></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><button className="font-bold font-size-20">로그인</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <hr/>
                <div className="sns-login-btn">
                    <a type="button" className="button big bg-color-naver">네이버</a>
                    <a type="button" className="button big bg-color-kakao">카카오</a>
                    <a type="button" className="button big bg-color-google">구글</a>
                </div>
            </div>
        </div>

    );
}