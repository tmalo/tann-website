import axios from 'axios';
import * as rssParser from 'react-native-rss-parser';
import Logger from './logger';

function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function normalizeId(item, index) {
  if (item.id.startsWith('http'))
    item.id = slugify(item.title);
}

module.exports= async function(feedurl) {
    const res = await axios.get(feedurl);
    const response = await res.data;
    const data = await rssParser.parse(response);

    Logger.info(`Show data fetched. Count: ${res.data.length}`);
    data.items.forEach(normalizeId);
    return {
      feed: data
    };    
}