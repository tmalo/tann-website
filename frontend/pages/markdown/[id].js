import React from "react";
import matter from "gray-matter";
import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";

import Layout from "../../components/MyLayout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const meta = (location) => {
  function absolute(base, relative) {
    var stack = base.split("/"),
      parts = relative.split("/");
    stack.pop(); // remove current file name (or empty string)
    // (omit if "base" is the current folder without trailing slash)
    for (var i = 0; i < parts.length; i++) {
      if (parts[i] == ".") continue;
      if (parts[i] == "..") stack.pop();
      else stack.push(parts[i]);
    }
    return stack.join("/");
  }
};

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const post = await import(`../../md/${query.id}.md`);
    const document = matter(post.default);
    //const html= await markdownToHtml(document.content || '');
    return {
      ...document,
    };
  }
  render() {
    return (
      <Layout
        meta={meta(this.props.location)}
        title={this.props.data.title}
        links={this.props.docs}
      >
        <Container className="markdown">
          <Row>
            <Col sm={8} className="markdown-main">
              <div className="post">
                <h1 className="post-title">{this.props.data.title}</h1>
                {
                  unified()
                    .use(parse)
                    .use(remark2react)
                    .processSync(this.props.content || '').result
                }
              </div>
            </Col>

            <Col sm={{ size: 3, offset: 1 }} className="sidebar">
              <div className="sidebar-module sidebar-module-inset">&nbsp;</div>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}
