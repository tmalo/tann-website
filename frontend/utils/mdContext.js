import React from 'react';
import matter from 'gray-matter';

let srcs =require.context('../md', true, /\.md$/);
// Get posts from folder
const posts = (p => {
    const keys = p.keys();
    const values = keys.map(p);
    const data = keys.map((key, index) => {
        // Create slug from filename
        const slug = key.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');
        const value = values[index];
        // Parse document

        const document = matter(value.default);

        return {
            document,
            slug
        };
    });
    return data;
})(srcs);

export const MdContext = React.createContext(posts);
