
// pages/post/index.js

import React, { Component } from 'react';
import { Avatar, Button } from 'antd';
import PageLayout from '../../components/PageLayout';
import CommentSection from '../../components/CommentSection';

const comments = [
  {
    author: 'Han Solo',
    avatar: <Avatar>H</Avatar>,
    content: <p>Nice and interesting writeup</p>,
    datetime: '30 seconds ago'
  }
];

class SinglePostPage extends Component {
  state = { commentValue: '' };
  handleTextChange = e => {
    this.setState({
      commentValue: e.target.value
    });
  };
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
  };
  render() {
    const { commentValue } = this.state;
    return (
      <PageLayout>
        <div style={{ textAlign: 'right', marginBottom: 16 }}>
          <Button type="primary">Edit Post</Button>
        </div>
        <div className="hero">
          <h1 className="hero__text">The Black Widow</h1>
          <img
            className="hero__image"
            src="https://www.screengeek.net/wp-content/uploads/2019/01/black-widow-movie.jpg"
          />
        </div>
        <div className="author-box">
          <Avatar size={48} className="author-box__image">
            H
          </Avatar>
          <div className="author-box__text">
            <h3>Han Solo</h3>
            <small>20th April 2019</small>
          </div>
        </div>
        <section className="post-content">
          <p>
            Magna cupidatat qui incididunt qui laborum duis aliqua laboris
            ullamco cupidatat ipsum aliqua. Minim ex laborum commodo veniam
            voluptate consequat officia ea excepteur veniam ut nisi. Id duis
            consectetur est cillum nostrud laborum reprehenderit in voluptate
            aliquip Lorem anim velit labore. Consectetur incididunt elit eu ad
            qui laborum id. Incididunt anim in ea mollit et in exercitation
            excepteur consequat aliqua amet. Incididunt nulla in qui magna
            voluptate voluptate irure minim officia nostrud. Ipsum veniam anim
            Lorem nisi in aute id magna Lorem ipsum irure est id.
          </p>
          <p>
            Magna cupidatat qui incididunt qui laborum duis aliqua laboris
            ullamco cupidatat ipsum aliqua. Minim ex laborum commodo veniam
            voluptate consequat officia ea excepteur veniam ut nisi. Id duis
            consectetur est cillum nostrud laborum reprehenderit in voluptate
            aliquip Lorem anim velit labore. Consectetur incididunt elit eu ad
            qui laborum id. Incididunt anim in ea mollit et in exercitation
            excepteur consequat aliqua amet. Incididunt nulla in qui magna
            voluptate voluptate irure minim officia nostrud. Ipsum veniam anim
            Lorem nisi in aute id magna Lorem ipsum irure est id.
          </p>
        </section>
        <section className="comment-section">
          <CommentSection
            onChange={this.handleTextChange}
            comments={comments}
            onSubmit={this.handleSubmit}
            commentText={commentValue}
            submitting={false}
            user="Han Solo"
          />
        </section>
        <style jsx>
          {`
            .hero {
              position: relative;
              margin-bottom: 8px;
            }
            .hero__text {
              font-size: 3rem;
              color: #fff;
              width: 100%;
              text-align: center;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 1;
            }
            .hero__image {
              width: 100%;
              height: 400px;
              objectfit: cover;
              filter: grayscale(0.7);
            }
            .author-box {
              display: flex;
              align-items: center;
            }
            .author-box__text {
              margin-left: 8px;
            }
            .author-box__text h3 {
              margin-bottom: 0;
            }
            .post-content {
              padding-top: 2rem;
            }
            .comment-section {
              margin-top: 48px;
            }
            p {
              font-size: 18px;
            }
          `}
        </style>
      </PageLayout>
    );
  }
}

export default SinglePostPage;