import format from 'date-format';
import Logger from '../utils/logger';
import Link from 'next/link';
import getFeed from '../utils/getfeed';

function cleanText(source) {
  const regex = /(<([^>]+)>)/ig;
  return source.replace(regex, '');  
}
const Episode = function (props) {
    var image = props.image
    if ((props.item.itunes.image))
        image = props.item.itunes.image;
    
    Logger.debug(props.item);

    //var description ={__html: ''};
    var description = {__html: cleanText(props.item.description).substring(0, 180) + "..."};
    var pubDate = new Date(props.item.published);
    var strPubDate = format.asString("dd-MM-yyyy", pubDate);
    var audiourl = props.item.enclosures
        .filter((enc) => enc.mimeType.substring(0,5) == 'audio');

    var url ='';
    if (typeof audiourl[0] !== 'undefined')
        url = audiourl[0].url;

    //console.log(url);

    return (
    <div className="col-lg-6 col-md-8 rss-episode">
      <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-200 position-relative">
        <div className="col p-2 d-flex flex-column position-static">
          <h3 className="mb-0">{props.item.title}</h3>
          <div className="mb-1 text-muted">{strPubDate}</div>
          <p className="card-text mb-auto" dangerouslySetInnerHTML={description} />

          <Link href="/episode/[id]" as={`/episode/${props.item.id}`} >
              <a className="stretched-link">Vwè épizòd-la</a>
           </Link>
        </div>
        <div className="col-auto d-none d-md-block">
          <img className="bd-placeholder-img" width="200" height="200" src={image} />
        </div>
      </div>
    </div>

    )
}

class EpisodeList extends React.Component {
  constructor(props){
    super(props)

  }

  componentDidMount() {
  }
  render()
  {

    const list = this.props.items.map((item, index) => (
      <Episode key={index} item= {item} image={this.props.image} />
    ))

    return (
      <div className="row mb-2">
        {list}        
    </div>
    )
  }
}


export default EpisodeList