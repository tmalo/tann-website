import React from 'react'
import App, { Container } from 'next/app'
import matter from 'gray-matter';

export default class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}
    
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx)
        }
    
        let req = ctx.req;
        let protocol = 'https:'
        let host = req ? req.headers.host : '' //window.location.hostname
        if (host.indexOf('localhost') > -1) {
          protocol = 'http:'
        }
        
        var location = {protocol: protocol, host: host};

        pageProps.location = location;

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

        pageProps.docs = posts;

        return { pageProps }
      }
    
    ///

    ///
  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
          <Component {...pageProps} />
      </Container>
    )
  }
}