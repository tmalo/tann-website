import Layout from '../components/MyLayout'
import Jumbotron  from '../components/Jumbotron'
import EpisodeList from '../components/EpisodeList'
import Container from '../components/Container'
import fetch from 'isomorphic-unfetch';
import * as rssParser from 'react-native-rss-parser';

const  Index = props => {
    return (
        <Layout title="Home">
            <Jumbotron />
            <Container>
                <EpisodeList items={props.feed.items} image={props.feed.itunes.image}/>
            </Container>
      </Layout>
    );
  }


Index.getInitialProps = async function() {
    const res = await fetch('http://thefutur.libsyn.com/rss');
    const response = await res.text();
    const data = await rssParser.parse(response);

    console.log(`Show data fetched. Count: ${data.length}`);
  
    return {
      feed: data
    };
  };
  
  export default Index;