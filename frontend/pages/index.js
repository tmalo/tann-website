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

const  Index = props => {
    var server = process.env.API_SERVER || '';

    return (
        <Layout title="Home">
          <Jumbotron>
              <Container className="topContainer">
                <Row>
                  <Col sm={4}><Image src="../static/artwork.jpg" fluid rounded /></Col>
                  <Col sm={8}>
                    <h1 className="display-3">Tann & Konprann</h1>
                  <p>This is a template for a simple marketing or informational website. 
                    It includes a large callout called a jumbotron and three supporting pieces of content. 
                    Use it as a starting point to create something more unique.</p>
                    <WhereToListen />
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
                <h2 className="display-4">episodes</h2>
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
