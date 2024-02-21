import '../css/style.css'
import '../css/skel.css'
import '../css/style-xlarge.css'

export default function Banner(){
return (
    <section id="banner">
        <article className="inner">
          <h2>This is Ion</h2>
          <p>A free responsive template by <a href="http://templated.co">TEMPLATED</a></p>
          <ul className="actions">
            <li><img src='images/banner.jpg' width={'850px'}></img></li>
          </ul>
        </article>
	</section>
    );
}