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
            <li><a href="#content" className="button big special">Sign Up</a></li>
            <li><a href="#elements" className="button big alt">Learn More</a></li>
          </ul>
        </article>
   </section>
    );
}