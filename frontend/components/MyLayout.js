import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

import stylesheet from '../styles/main.scss'

const Layout = props => (
  <div>
    <Head>
      <title>{ props.title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <Header />
    <main role="main">    
      { props.children }
    </main>
    <Footer />
  </div>
)

export default Layout