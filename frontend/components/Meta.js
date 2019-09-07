import React from 'react';
import path from 'path';

const pageData = {title: '', description: ''};
export const PageContext = React.createContext(pageData);

export class Meta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                protocol: "https:", 
                host: "tann.timalo.com"
            }
        };
    }

    absolute(base, relative) {
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
        return stack.join("/").replace(/(?<!:)\/\//g, "/");
    }

    configure(source) {

        if (source.episode) {
            return [source.episode, false];
        } else {
            return [null, true];
        }
    }
    render() {
        const [episode, isSummary] = this.configure(this.props);
        if (isSummary)
            return this.renderSummary();

        return this.renderEpisode(episode);
    }

    renderEpisode(item) {
        let location = this.state.location;
        return (
                <PageContext.Consumer>
                    {page => (
                        <>
                        <meta name="twitter:card" content="player" />
                        <meta name="twitter:site" content="@tannkonprann" />
                        <meta name="twitter:creator" content="@timalo_officiel" />
                        <meta property="og:url" 
                        content={this.absolute(`${location.protocol}//${location.host}/`, 
                        path.join(__dirname, `episode/${item.id}`))}  />
                        <meta property="og:title" content={item.title} />
                        <meta property="og:description" content={page.description} />
                        <meta property="og:image" content={item.itunes.image} />     
                        <meta property="twitter:player" 
                        content={this.absolute(`${location.protocol}//${location.host}/`, `frame/${item.id}`)}  />
                        <meta name="twitter:player:width" content="480" />
                        <meta name="twitter:player:height" content="480" />
                        </>   

                    )}
                </PageContext.Consumer>
          );        
    }
    renderSummary() {
        let location = this.state.location;
        return (
                <PageContext.Consumer>
                    {page => (
                        <>
                        <meta name="twitter:card" content="summary" />
                        <meta name="twitter:site" content="@tannkonprann" />
                        <meta name="twitter:creator" content="@timalo_officiel" />
                        <meta property="og:url" content={this.absolute(`${location.protocol}//${location.host}/`, 'index')} />
                        <meta property="og:title" content={page.title} />
                        <meta property="og:description" content={page.description} />
                        <meta property="og:image" 
                        content={this.absolute(`${location.protocol}//${location.host}/`, 
                        path.join(__dirname, '../static/artwork.jpg'))} />     
                        </>   

                    )}
                </PageContext.Consumer>
          );        
    }
}

