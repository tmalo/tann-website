import Link from 'next/link'
import Logger from '../../utils/logger'
import getFeed from '../../utils/getfeed';
import Error from 'next/error';

import Layout from '../../components/MyLayout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import AudioPlayer from "react-h5-audio-player";

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

const meta = (location, item) => {
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
  <meta name="twitter:card" content="player" />
    <meta name="twitter:site" content="@tannkonprann" />
    <meta name="twitter:creator" content="@timalo_officiel" />
    <meta property="og:url" 
    content={absolute(`${location.protocol}//${location.host}/`, `episode/${item.id}`)}  />
    <meta property="og:title" content={item.title} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:image" content={item.itunes.image} />     
    <meta property="twitter:player" 
    content={absolute(`${location.protocol}//${location.host}/`, `frame/${item.id}`)}  />
   	<meta name="twitter:player:width" content="480" />
	  <meta name="twitter:player:height" content="480" />
   </>   
  );
};
/*

const meta = 
  <meta name="twitter:card" content="player" />
	<meta name="twitter:site" content="@TwitterDev" />
	<meta name="twitter:title" content="Sample Player Card" />
	<meta name="twitter:description" content="This is a sample video. When you implement, make sure all links are secure." />
	<meta name="twitter:image" content="https://yoursite.com/example.png" />
	<meta name="twitter:player" content="https://yoursite.com/container.html" />
	<meta name="twitter:player:width" content="480" />
	<meta name="twitter:player:height" content="480" />

*/

const Post = props => {

  if (props.error == 404) {
    return (<Error statusCode='404' />);
  };

  return (
        <Layout meta ={meta(props.location, props)} title={props.title}>
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

    var d = await getFeed(process.env.FEED_URL);
    var items= d.feed.items;

    var id = context.query.id;

    var item = items.find(x => x.id ==id);

    if (!item) {
      return {error: 404 };
    }

    return item;
  };
  
  export default Post;
