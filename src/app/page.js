import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Nav from "@/component/Nav";
import MyDocument from "./pages/_document";
import MyComponent from "@/component/Script/pro";




export default function Home() {
  return (
    <>
      <Header></Header>
      {/* 메인배너 영역 */}
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
      {/* 중간영역 */}
      <Nav></Nav>
      
      {/* 끝영역 */}
      <Footer></Footer>
    </>
  );
}
