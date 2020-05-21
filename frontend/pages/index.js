import Link from 'next/link'
import Logger from '../utils/logger'
import path from 'path';
import axios from 'axios';

import Layout from '../components/MyLayout';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import WhereToListen from '../components/where-to-listen';
import EpisodeList from '../components/EpisodeList';
import { PageContext, Meta } from '../components/Meta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import getFeed from '../utils/getfeed';


const links = {
  itunes: 'https://podcasts.apple.com/fr/podcast/tann-konprann/id1474553007',
  castbox: 'https://castbox.fm/channel/id2227069',
  rss: "https://anchor.fm/s/cb1379c/podcast/rss",
  breaker: "https://www.breaker.audio/tann-and-konprann",
  google: "https://www.google.com/podcasts?feed=aHR0cHM6Ly9hbmNob3IuZm0vcy9jYjEzNzljL3BvZGNhc3QvcnNz",
  pocket: "https://pca.st/y5r0",
  radiopublic: "https://radiopublic.com/tann-konprann-6BJw3M",
  spotify: "https://open.spotify.com/show/1pw9hzE4mgTqsZN5rcQRCY",
  podplayer: "http://podplayer.net/?podId=2414806",
  castro: "https://castro.fm/itunes/1474553007",
  stitcher: "https://www.stitcher.com/podcast/timalo/tann-konprann"
}


const pageTitle = "Tann & Konprann, on pòdkas a TiMalo";
const pageDescription = "A pa toutmoun ki ka tann kréyòl touléjou. Pòdkas-lasa \
  sé on lokazyon pou nou tann lang-la, dékouvè tèks é lokans a makèdpawòl é konnèt lang-la pimyé.";

  class Index extends React.Component {
    constructor(props){
      super(props)
  
      this.state = {
        nonce: '',
        items: [],
        image: ''
      }

      this.docs = props.docs;
  
      this.loadData()
  
    }
  
    
    async loadData() {
      //var resp =await axios.get(process.env.apiServer + '/secret');
      //const data = await resp.data.results;
      //this.setState({nonce: data.nonce})

      Logger.info(process.env.feedURL);
  
      await getFeed(process.env.feedURL)
      .then(data =>{
        this.setState({items: data.feed.items, image: data.feed.itunes.image})
        
      })
    }
  
  render() {
    var server = process.env.apiServer || '';

    const pageInfo = {
      title: pageTitle, 
      description: pageDescription
    }
    const metaData = (
      <PageContext.Provider value={pageInfo}>
        <Meta />
      </PageContext.Provider>
    );
    
    
    return (
        
        <Layout meta={metaData} title={pageTitle} links={this.docs}>
          <Jumbotron>
              <Container className="topContainer ">
                <Row>
                  <Col sm={4}><Image src={path.join(__dirname, "../static/artwork.jpg")} fluid rounded /></Col>
                  <Col sm={6}>
                    <h1 className="display-3">Tann & Konprann</h1>
                    <p lang="cpf-gp">A pa toutmoun ki ka tann kréyòl touléjou. Pòdkas-lasa sé on lokazyon 
                      pou nou tann lang-la, dékouvè tèks é lokans a makèdpawòl é konnèt 
                      lang-la pimyé. </p>

                      <p lang="fr">Nous n'avons pas toujours l'occasion d'entendre du créole dans notre vie 
                    de tous les jours. Ce podcast c'est l'opportunité d'entendre la langue, 
                    de découvrir des textes et des auteurs créolophones et de s'attarder sur 
                    du vocabulaire et des expressions.</p>
 
                    <WhereToListen links={links} />
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  <Col sm={4}>&nbsp;</Col>
                  <Col sm={6} >
                  <Button variant="light" href="https://discord.gg/HzX9j4k" >
                  <FontAwesomeIcon icon={['fa', 'comment-dots']}/> &nbsp; 
                    Vin ban mwen santiman a-w !
                  </Button>
                  </Col>
                </Row>
              </Container>
              </Jumbotron>

              <Container className="episodes">
                <h2 className="display-4">epizod</h2>
                <div id="episodeBlock">
                  <EpisodeList items ={this.state.items} image = {this.state.image} />
                </div>
            </Container>
      </Layout>
    );
  };

  }

export default Index;
