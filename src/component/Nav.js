"use client"

import '../css/style.css'
import '../css/skel.css'
import '../css/style-xlarge.css'


export default function Nav(){
    return (
        <nav>
            <section id="one" className="wrapper style1"><header className="major"><h2>Ipsum feugiat consequat</h2><br/>
					<p>Tempus adipiscing commodo ut aliquam blandit</p>
				</header><div className="container">
					<div className="row">
						<div className="4u">
							<section className="special box"><i className="icon fa-area-chart major"></i>
								<h3>Justo placerat</h3>
								<p>Eu non col commodo accumsan ante mi. Commodo consectetur sed mi adipiscing accumsan ac nunc tincidunt lobortis.</p>
							</section></div>
						<div className="4u">
							<section className="special box"><i className="icon fa-refresh major"></i>
								<h3>Blandit quis curae</h3>
								<p>Eu non col commodo accumsan ante mi. Commodo consectetur sed mi adipiscing accumsan ac nunc tincidunt lobortis.</p>
							</section></div>
						<div className="4u">
							<section className="special box"><i className="icon fa-cog major"></i>
								<h3>Amet sed accumsan</h3>
								<p>Eu non col commodo accumsan ante mi. Commodo consectetur sed mi adipiscing accumsan ac nunc tincidunt lobortis.</p>
							</section></div>
					</div>
				</div>
			</section>
            <section id="two" className="wrapper style2">
                <header className="major">
                    <h2>Commodo accumsan aliquam</h2><br/>
					<p>Amet nisi nunc lorem accumsan</p>
				</header>
                <div className="container">
					<div className="row">
						<div className="6u">
							<section className="special">
                                <a href="#" className="image fit"><img src="../images/pic01.jpg" alt="logo" width="680" height="308"></img></a>
								<h3>Mollis adipiscing nisl</h3>
                                    <p>Eget mi ac magna cep lobortis faucibus accumsan enim lacinia adipiscing metus urna adipiscing cep commodo id.
                                        Ac quis arcu amet. Arcu nascetur lorem adipiscing non faucibus odio nullam arcu lobortis. Aliquet ante feugiat. Turpis aliquet ac posuere volutpat lorem arcu aliquam lorem.
                                    </p>
								<ul className="actions">
                                    <li>
                                        <a href="#" className="button alt">Learn More</a>
                                    </li>
								</ul>
                            </section>
                        </div>
						<div className="6u">
							<section className="special">
                                <a href="#" className="image fit"><img src="images/pic02.jpg" alt="logo2" width="680" height="308"/></a>
								<h3>Neque ornare adipiscing</h3>
                                    <p>Eget mi ac magna cep lobortis faucibus accumsan enim lacinia adipiscing metus urna adipiscing cep commodo id. Ac quis arcu amet.
                                        Arcu nascetur lorem adipiscing non faucibus odio nullam arcu lobortis. Aliquet ante feugiat. Turpis aliquet ac posuere volutpat lorem arcu aliquam lorem.
                                    </p>
								<ul className="actions">
                                    <li>
                                        <a href="#" className="button alt">Learn More</a>
                                    </li>
								</ul>
                            </section>
                        </div>
					</div>
				</div>
			</section>
            <section id="three" className="wrapper style1">
                <div className="container">
					<div className="row">
						<div className="8u">
							<section><h2>Mollis ut adipiscing</h2>
								<a href="#" className="image fit"><img src="images/pic03.jpg" alt="logo3" width="818" height="340"/></a>
								<p>Vis accumsan feugiat adipiscing nisl amet adipiscing accumsan blandit accumsan sapien blandit ac amet faucibus aliquet placerat commodo. Interdum ante aliquet commodo accumsan vis phasellus adipiscing. Ornare a in lacinia. Vestibulum accumsan ac metus massa tempor. Accumsan in lacinia ornare massa amet. Ac interdum ac non praesent. Cubilia lacinia interdum massa faucibus blandit nullam. Accumsan phasellus nunc integer. Accumsan euismod nunc adipiscing lacinia erat ut sit. Arcu amet. Id massa aliquet arcu accumsan lorem amet accumsan commodo odio cubilia ac eu interdum placerat placerat arcu commodo lobortis adipiscing semper ornare pellentesque.</p>
							</section>
                        </div>
						<div className="4u">
							<section>
                                <h3>Magna massa blandit</h3>
								<p>Feugiat amet accumsan ante aliquet feugiat accumsan. Ante blandit accumsan eu amet tortor non lorem felis semper. Interdum adipiscing orci feugiat penatibus adipiscing col cubilia lorem ipsum dolor sit amet feugiat consequat.</p>
								<ul className="actions">
                                    <li><a href="#" className="button alt">Learn More</a></li>
								</ul>
                            </section><hr/>
                            <section>
                                <h3>Ante sed commodo</h3>
                                    <ul className="alt"><li><a href="#">Erat blandit risus vis adipiscing</a></li>
                                        <li><a href="#">Tempus ultricies faucibus amet</a></li>
                                        <li><a href="#">Arcu commodo non adipiscing quis</a></li>
                                        <li><a href="#">Accumsan vis lacinia semper</a></li>
                                    </ul>
                            </section>
                        </div>
					</div>
				</div>
			</section>
        </nav>
    );
}
