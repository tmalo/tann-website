import Link from 'next/link'
import Logger from '../../utils/logger'
import getFeed from '../../utils/getfeed';
import Error from 'next/error';
import path from 'path';

import Layout from '../../components/MyLayout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import AudioPlayer from "react-h5-audio-player";

import { PageContext, Meta } from '../../components/Meta';

const pageDescription = "A pa tout moun ki ka tann kréyòl touléjou. Pòdkas-la sa \
  sé on lokazyon pou nou tann lang-la, dékouvè tèks é lokans a makèdpawòl é konnèt lang-la pimyé.";


function getAudioUrl(item) {
  var audiourl = item.enclosures
  .filter((enc) => enc.mimeType.substring(0,5) == 'audio');

  var url ='';
  if (typeof audiourl[0] !== 'undefined')
    url = audiourl[0].url;

  return url;
}

const Post = props => {

  if (props.error == 404) {
    return (<Error statusCode='404' />);
  };

  const pageInfo = {
    title: props.title, 
    description: pageDescription
  }
  const metaData = (
    <PageContext.Provider value={pageInfo}>
      <Meta episode={props} />
    </PageContext.Provider>
  );

  return (
        <Layout meta ={metaData} 
        links={props.docs}
          title={props.title}>
              <Container className="rss-episode single-episode">
                <Row>
                  <Col sm={4}><Image src={props.itunes.image} fluid rounded /></Col>
                  <Col sm={8}>
                    <h2>{props.title}</h2>
                    <div className="description" dangerouslySetInnerHTML={{__html: props.description}} ></div>
                    <AudioPlayer src={getAudioUrl(props)} />
                  </Col>
                </Row>
              </Container>
      </Layout>
    );
  }
  
  Post.getInitialProps = async function(context) {

    let rssfeed = await getFeed(process.env.FEED_URL);
    var items= rssfeed.feed.items;

    var id = context.query.id;

    var item = items.find(x => x.id ==id);

    if (!item) {
      return {error: 404 };
    }

    return item;
  };
  
  export default Post;
