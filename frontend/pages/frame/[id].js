import getFeed from '../../utils/getfeed';
import Link from 'next/link';

function getAudio(item) {
    var audiourl = item.enclosures
    .filter((enc) => enc.mimeType.substring(0,5) == 'audio');
  
    var audio = [];
    if (typeof audiourl[0] !== 'undefined')
      audio = audiourl[0];
  
    return audio;
  }

const Frame = props => {
    var audio = getAudio(props);

    return (
        <>

        <audio controls>
            <source src={audio.url} type={audio.mimeType} />
            Your browser does not support the audio element.
        </audio>
 
        <style jsx>{`
        .player {
            display: block;
        }
        audio {
           width:100%;
           height:50px;
           max-width: 600px;
           margin: auto;
        }
        `}</style>
        </>
    )
};

Frame.getInitialProps = async function(context) {

    var d = await getFeed(process.env.FEED_URL);
    var items= d.feed.items;

    var id = context.query.id;

    var item = items.find(x => x.id ==id);

    if (!item) {
      return {error: 404 };
    }

    return item;
  };

export default Frame;