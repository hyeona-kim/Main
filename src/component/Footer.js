const { default: Link } = require("next/link");

import '../css/style.css'
import '../css/skel.css'
import '../css/style-xlarge.css'

export default function Footer(){
    return(
        <div>
        <footer id="footer">
			<div className="container">
				<div className="row double">
					<div className="6u">
						<div className="row collapse-at-2">
							<div className="6u">
								<h3>Accumsan</h3>
								<ul className="alt"><li><a href="#">Nascetur nunc varius</a></li>
									<li><a href="#">Vis faucibus sed tempor</a></li>
									<li><a href="#">Massa amet lobortis vel</a></li>
									<li><a href="#">Nascetur nunc varius</a></li>
								</ul></div>
							<div className="6u">
								<h3>Faucibus</h3>
								<ul className="alt"><li><a href="#">Nascetur nunc varius</a></li>
									<li><a href="#">Vis faucibus sed tempor</a></li>
									<li><a href="#">Massa amet lobortis vel</a></li>
									<li><a href="#">Nascetur nunc varius</a></li>
								</ul></div>
						</div>
					</div>
					<div className="6u">
						<h2>Aliquam Interdum</h2>
						<p>Blandit nunc tempor lobortis nunc non. Mi accumsan. Justo aliquet massa adipiscing cubilia eu accumsan id. Arcu accumsan faucibus vis ultricies adipiscing ornare ut. Mi accumsan justo aliquet.</p>
						<ul className="icons">
							<li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
							<li><a href="https://www.facebook.com/koicta" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
							<li><a href="https://blog.naver.com/ict-1" className="icon fa-naver" style={{ backgroundImage:"C:\MyWork\NEXT_Study\Work\Main\public\images\v.jpeg" }}><span className="label">NaverBlog</span></a></li>
							<li><a href="#" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
							<li><a href="#" className="icon fa-pinterest"><span className="label">Pinterest</span></a></li>
						</ul></div>
				</div>
			</div>
		</footer>
		<div className="copyright">
			Powered by: <a href="https://ictedu.co.kr/">한국ICT인재개발원</a>
		</div>
		</div>
    );

}