import Link from 'next/link';

const icons = {
    itunes: {
        src: "../static/icons/itunes.png",
        name: "Apple Podcasts"
    },

    breaker: {
        src: "../static/icons/breaker.png",
        name: "Breaker"
    },

    castbox: {
        src: "../static/icons/castbox.png",
        name: "Castbox"
    },

    google: {
        src: "../static/icons/google_podcasts.png",
        name: "Google Podcasts"
    },

    overcast: {
        src: "../static/icons/overcast.png",
        name: "Overcast"
    },

    pocket: {
        src: "../static/icons/pocket_casts.png",
        name: "Pocket Casts"
    },

    radiopublic: {
        src: "../static/icons/radiopublic.png",
        name: "Radio Public"
    },

    spotify: {
        src: "../static/icons/spotify.png",
        name: "Spotify"
    },

    rss: {
        src: "../static/icons/rss.png",
        name: "Rss"
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
            <Link href={v.url}>
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
