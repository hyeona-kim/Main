const { default: Link } = require("next/link");

import '../css/style.css'
import '../css/skel.css'
import '../css/style-xlarge.css'

export default function Footer() {
	return (
		<div>
			<footer id="footer">
				<div className="container">
					<div className="row double">
						<div className="6u">
							<a href="/" className="image fit" style={{paddingLeft:'8em'}} >
								<img src="../../images/ict_logo.png" alt="footerlogo" />
							</a><br />
							<div className='row' style={{marginTop:'20px', fontSize:'15px'}}>
								<div className='6u' style={{paddingLeft:'9em'}}>
									<ul className='alt'>
										<li>고객센터</li>
										<li>02.739.7235</li>
									</ul>
								</div>
								<div className='6u'>
									<ul className='alt'>
										<li>신촌센터 강남센터</li>
										<li>연중무휴 AM 09:00 ~ PM 10:00</li>
									</ul>
								</div>
							</div>
							<br />
							<ul className="icons" style={{marginTop:'50px'}}>
								<li><a href="https://pf.kakao.com/_NxddJK" className="icon fa-comments"><span className="label">kakao</span></a></li>
								<li><a href="https://www.facebook.com/koicta" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
								<li><a href="https://blog.naver.com/ict-1" className="icon fa-newspaper-o"><span className="label">Blog</span></a></li>
								<li><a href="/map" className="icon fa-map-marker"><span className="label">Map</span></a></li>
							</ul>
							<br />
						</div>
						<div className="6u">
							<div className="row collapse-at-2">
								<div className="12u" style={{paddingLeft:'6em', fontSize:'15px', marginTop:'30px'}}>
									{/* <h3>Accumsan</h3> */}
									<ul className='alt' style={{marginTop:'50px'}}>
										<li><p>신촌센터 서울특별시 마포구 백범로 23, 3층 (신수동, 케이터틀)</p></li>
										<li><p>강남센터 서울특별시 서초구 서초대로77길 41, 4층 (서초동, 대동Ⅱ)</p></li>
										<li>사단법인 한국ICT기술협회 | 대표자 : 염기호 | 사업자등록번호 : 776-82-00097</li>
										<li>대표전화 : 02-739-7235 | 팩스 : 02-733-3460 | 개인정보관리 책임자 : 허지은</li>
										<li>
											<a href='#'>개인정보취급방침</a>&nbsp;&nbsp;&nbsp;
											<a href='#'>이용약관</a>&nbsp;&nbsp;&nbsp;
											<a href='#'>이메일수집거부</a>
										</li>
										<li><span>Copyright (c) 한국ICT기술협회 All rights reserved.</span></li>
									</ul>
								</div>
							</div>
						</div>

					</div>
				</div>
			</footer>
		</div>
	);

}