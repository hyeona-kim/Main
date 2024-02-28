// /pages/_app_.js
import React from 'react'
import App from 'next/app'
import 'css/skel.css'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    const Layout = Component.layout || (children => <>{children}</>)
    return (
      <Layout>
        <Component {...pageProps}></Component>
      </Layout>
    )
  }
}
export default MyApp