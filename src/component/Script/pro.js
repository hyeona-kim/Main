import Script from "next/script";

export default function MyComponent(){
    return(
        <div>
            <Script>
                    <script src="js/html5shiv.js"></script>
                    <script src="js/jquery.min.js"></script>
                    <script src="js/skel.min.js"></script>
                    <script src="js/skel-layers.min.js"></script>
                    <script src="js/init.js"></script>
                    <noscript></noscript>
                    <body id="top"></body>
            </Script>
        </div>   
    );  
}

