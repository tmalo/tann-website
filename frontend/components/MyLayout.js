import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

//import stylesheet from '../styles/main.scss'

const Layout = props => (
  <div>
    <Head>
      <title>{ props.title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      
      <meta name="description"  
      content="Site du Podcast 'Tann &amp; Konprann' produit par TiMalo." />
    <meta name="keywords"  
    content="timalo, ti-malo, malo, slam, guadeloupe, gwadloup, kreyol, créole, artiste, 
    spoken word, podcast" />
    {props.meta}
    </Head>
    <Header docs={props.links}/>
    <main role="main">    
      { props.children }
    </main>
    <Footer />
  </div>
)

export default Layout