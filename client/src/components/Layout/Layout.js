import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";
// react-hot-toast is a react package to show toast messages
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster
          position='top-center'
          // toastOptions={{
          //   duration: 5000,
          // }}
        />
        {children}
      </main>
      <Footer />
    </div>
  )
}

// default keywords for the meta tags using helmet
Layout.defaultProps = {
  title: "Ecommerce App | shop now",
  description: "Ecommerce App usint MERN stack",
  keywords: "mern,rect,redux,ecommerce,app,node,mongodb,express",
  author: "NAND KISHORE"
}

export default Layout
