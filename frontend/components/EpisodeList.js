import format from 'date-format'

const Episode = function (props) {
    var image = props.image
    if ((props.item.itunes.image.length>0))
        image = props.item.itunes.image;
    
    var description = props.item.content.substring(0, 130) + "...";
    var pubDate = new Date(props.item.published);
    var strPubDate = format.asString("dd-MM-yyyy", pubDate);
    var audiourl = props.item.enclosures
        .filter((enc) => enc.mimeType.substring(0,5) == 'audio');

    var url ='';
    if (typeof audiourl[0] !== 'undefined')
        url = audiourl[0].url;

    console.log(url);

    return (
    <div className="col-md-6 rss-episode">
      <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-200 position-relative">
        <div className="col p-2 d-flex flex-column position-static">
          <h3 className="mb-0">{props.item.title}</h3>
          <div className="mb-1 text-muted">{strPubDate}</div>
          <p className="card-text mb-auto">
              {description}
            </p>
          <a href="#" className="stretched-link">Continue reading</a>
        </div>
        <div className="col-auto d-none d-lg-block">
          <img className="bd-placeholder-img" width="200" height="200" src={image} />
        </div>
      </div>
    </div>

    )
}

const EpisodeList = function(props) {
    
    return (
    <div className="row mb-2">
        {props.items.map(item =>(
            <Episode key={item.id} item= {item} image={props.image} />

        ))}
 </div>)
}

export default EpisodeList