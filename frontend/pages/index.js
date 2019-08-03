import Link from 'next/link'
import Logger from '../utils/logger'
import getFeed from '../utils/getfeed';

import Layout from '../components/MyLayout';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import WhereToListen from '../components/where-to-listen';
import MailchimpForm from '../components/mailchimp-form';
import EpisodeList from '../components/EpisodeList';

const links = {
  rss: "https://anchor.fm/s/cb1379c/podcast/rss",
  breaker: "https://www.breaker.audio/tann-and-konprann",
  google: "https://www.google.com/podcasts?feed=aHR0cHM6Ly9hbmNob3IuZm0vcy9jYjEzNzljL3BvZGNhc3QvcnNz",
  pocket: "https://pca.st/y5r0",
  radiopublic: "https://radiopublic.com/tann-konprann-6BJw3M",
  spotify: "https://open.spotify.com/show/1pw9hzE4mgTqsZN5rcQRCY",

}


const pageTitle = "Tann & Konprann, on pòdkas a TiMalo";
const pageDescription = "A pa tout moun ki ka tann kréyòl touléjou. Pòdkas-la sa \
  sé on lokazyon pou nou tann lang-la, dékouvè tèks é lokans a makèdpawòl é konnèt lang-la pimyé.";

const meta = (location) => {
  function absolute(base, relative) {
    var stack = base.split("/"),
        parts = relative.split("/");
    stack.pop(); // remove current file name (or empty string)
                 // (omit if "base" is the current folder without trailing slash)
    for (var i=0; i<parts.length; i++) {
        if (parts[i] == ".")
            continue;
        if (parts[i] == "..")
            stack.pop();
        else
            stack.push(parts[i]);
    }
    return stack.join("/");
}
  return (
    <>
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@tannkonprann" />
    <meta name="twitter:creator" content="@timalo_officiel" />
    <meta property="og:url" content={absolute(`${location.protocol}//${location.host}/`, 'index')} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:image" 
    content={absolute(`${location.protocol}//${location.host}/`, '../static/artwork.jpg')} />     
    </>   
  );
};

const  Index = props => {
    var server = process.env.API_SERVER || '';

    return (
        <Layout meta={meta(props.location)} title={pageTitle} links={props.docs}>
          <Jumbotron>
              <Container className="topContainer d-flex">
                <Row>
                  <Col sm={4}><Image src="../static/artwork.jpg" fluid rounded /></Col>
                  <Col sm={6}>
                    <h1 className="display-3">Tann & Konprann</h1>
                    <p lang="cpf-gp">A pa tout moun ki ka tann kréyòl touléjou. Pòdkas-la sa sé on lokazyon 
                      pou nou tann lang-la, dékouvè tèks é lokans a makèdpawòl é konnèt 
                      lang-la pimyé. </p>

                      <p lang="fr">Nous n'avons pas toujours l'occasion d'entendre du créole dans notre vie 
                    de tous les jours. Ce podcast c'est l'opportunité d'entendre la langue, 
                    de découvrir des textes et des auteurs créolophones et de s'attarder sur 
                    du vocabulaire et des expressions.</p>
 
                    <WhereToListen links={links} />
                  </Col>
                </Row>
              </Container>
              </Jumbotron>
            <div className="newsletter">
              <Container>
                <div className="row justify-content-md-center newsletter">
                    <h2>Enskri-w adan kourilèt-la</h2>
                    <div className="w-100"></div>
                    <MailchimpForm  server = {server}/>
                </div>
              </Container>
              </div>
              <Container className="episodes">
                <h2 className="display-4">epizod</h2>
                <div id="episodeBlock">
                  <EpisodeList items={props.feed.items} image={props.feed.itunes.image}/>
                </div>
            </Container>
      </Layout>
    );
  }

  Index.getInitialProps = async function() {

    return await getFeed(process.env.FEED_URL);
  };
  
export default Index;
