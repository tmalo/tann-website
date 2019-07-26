import axios from 'axios';
import * as rssParser from 'react-native-rss-parser';
import Logger from './logger';

module.exports= async function(feedurl) {
    const res = await axios.get(feedurl);
    const response = await res.data;
    const data = await rssParser.parse(response);

    Logger.info(`Show data fetched. Count: ${res.data.length}`);
  
    return {
      feed: data
    };    
}