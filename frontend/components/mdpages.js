import React from 'react'
import matter from 'gray-matter';
import Link from 'next/link';

const MdPages = function(props) {

    return (
        <>
             {props.pages.map(({ document: { data }, slug }) => (
                 <li className={props.itemClass}  key={slug}>
                  <Link href="/markdown/[id]" as={`/markdown/${slug}`}>
                    <a className={props.linkClass}>{data.title}</a>
                </Link>
                </li>
            ))}
        </>
    )
}

MdPages.getInitialProps = async function() {
    //let data = require.context('../md', true, /\.md$/);
    console.log('inside getInitialProps ');
    return {document:'', slug: 'podcast_app'};

    // // Get posts from folder
    // const posts = (ctx => {
    //     const keys = ctx.keys();
    //     const values = keys.map(ctx);
    //     const data = keys.map((key, index) => {
    //         // Create slug from filename
    //         const slug = key.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');
    //         const value = values[index];
    //         // Parse document
    //         const document = matter(value);
    //         return {
    //             document,
    //             slug
    //         };
    //     });
    //     return data;
    // })(require.context('../md', true, /\.md$/));
    // return {
    //     posts
    // };
}

export default MdPages;