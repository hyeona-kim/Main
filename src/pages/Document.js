import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components';
import Link from 'next/link'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const originalRenderPage = ctx.renderPage
        const sheet = new ServerStyleSheet()
        ctx.renderPage = () =>
          originalRenderPage({
            enhanceApp: (App) =>(props) => sheet.collectStyles(<App {...props}/>),
            enhanceComponent: (Component) => Component,
          })
        
        const initialProps = await Document.getInitialProps(ctx)
    
        return {
            ...initialProps,
              styles: [
              <>
                {initialProps.styles}
                {sheet.getStyleElement()}
              </>,
            ],
        }
      }

    render() {
        return (
            <Html>
                <Head>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="js/html5shiv.js"></script>
                    <script src="js/jquery.min.js"></script>
                    <script src="js/skel.min.js"></script>
                    <script src="js/skel-layers.min.js"></script>
                    <script src="js/init.js"></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument

