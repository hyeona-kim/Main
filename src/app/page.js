import Nav from "@/component/Nav";
import '../css/style.css'
import '../css/skel.css'
import '../css/style-xlarge.css'
import Banner from "@/component/banner";
import { BrowserRouter } from "react-router-dom";
export default function Home() {

  return (
    <>
      <Banner/>
      
      <Nav></Nav>
    </>
  );
}
