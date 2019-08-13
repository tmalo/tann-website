import Link from 'next/link';
import path from 'path';

const icons = {
    itunes: {
        src: path.join(__dirname, "../static/icons/itunes.png"),
        name: "Apple Podcasts"
    },

    breaker: {
        src: path.join(__dirname, "../static/icons/breaker.png"),
        name: "Breaker"
    },

    castbox: {
        src: path.join(__dirname, "../static/icons/castbox.png"),
        name: "Castbox"
    },

    google: {
        src: path.join(__dirname, "../static/icons/google_podcasts.png"),
        name: "Google Podcasts"
    },

    overcast: {
        src: path.join(__dirname, "../static/icons/overcast.png"),
        name: "Overcast"
    },

    pocket: {
        src: path.join(__dirname, "../static/icons/pocket_casts.png"),
        name: "Pocket Casts"
    },

    radiopublic: {
        src: path.join(__dirname, "../static/icons/radiopublic.png"),
        name: "Radio Public"
    },

    spotify: {
        src: path.join(__dirname, "../static/icons/spotify.png"),
        name: "Spotify"
    },

    podplayer: {
        src: path.join(__dirname, "../static/icons/podplayer.png"),
        name: "Pod Plaler"
    },
    rss: {
        src: path.join(__dirname, "../static/icons/rss.png"),
        name: "Rss"
    },
    stitcher: {
        src: path.join(__dirname, "../static/icons/stitcher.png"),
        name: "Stitcher"
    }
}


const WhereToListen = function (props) {
    
    let toshow = []; 

    for (let [k, v] of Object.entries(icons)) {
        let url = Object.keys(props.links).find(link => link==k);
        if (url != undefined) {
            v.url = props.links[k];
            toshow.push(v);
        }
    }

    var content = toshow.map( (v, index) => {
        return (<li key={index}>
            <Link href={v.url} prefetch={false}>
                <a><img src={v.src} height="28px" width="28px"
                alt={v.name} title={v.name}/></a>
            </Link>
        </li>);
    });

    return (
    
    <ul className="whereToListen">
        {content}
    </ul>    
)};

export default WhereToListen
