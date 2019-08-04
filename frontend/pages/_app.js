import React from 'react'
import App, { Container } from 'next/app'
import getFeed from '../utils/getfeed';
var fs = require('fs');
import path from 'path';

var isBrowser=new Function("try {return this===window;}catch(e){ return false;}");

function createFeedFile(filePath) {
  getFeed(process.env.FEED_URL)
  .then(feed => {
    let data = JSON.stringify(feed);
    fs.writeFileSync( filePath, data);
  })
  .catch(err=> {
    console.log(err);
  })
}
export default class MyApp extends App {
    constructor(props) {
      super(props);

      //{ babelrc: false }

      // let filePath = 'components/feed.json';
      // if (!isBrowser())
      // {
      //   //createFeedFile(filePath);
      //   if (fs.existsSync(filePath)) {
      //     let fStat = fs.statSync(filePath);
      //     var expireDate = fStat.ctime;
      //     expireDate.setMinutes(expireDate.getMinutes() + 2);
      //     if (Date.now() > expireDate)
      //     createFeedFile(filePath);
      //   } else {
      //     createFeedFile(filePath)
      //   }
  
      // }
      
      
    }

    ///
  render () {
    const { Component, pageProps } = this.props;


  
    return (
        <Container>
            <Component {...pageProps} />
        </Container>
    )
  }
}