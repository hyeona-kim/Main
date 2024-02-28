import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Blank from "@/component/Blank";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "한국ICT기술협회/인재개발원",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <>
    <html lang="en">
      <Header>
        <head>
          <script type="text/javascript" src="js/html5shiv.js"></script>
          <script type="text/javascript" src="js/jquery.min.js"></script>
          <script type="text/javascript" src="js/skel.min.js"></script>
          <script type="text/javascript" src="js/skel-layers.min.js"></script>
          <script type="text/javascript" src="js/init.js"></script>
          <script type="text/javascript" src="js/ba.js"></script>
        </head>
      </Header>
      <body className={inter.className}>
        <Blank />
        {children}
        <Footer />
      </body>
    </html>
    </>
  );
}
