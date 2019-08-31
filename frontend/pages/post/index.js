
// pages/post/index.js

import React, { Component } from 'react';
import Link from 'next/link'; // add this
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


const posts = [
    {
        id: 1,
        header_image:
            'https://res.cloudinary.com/hotels-ng/image/upload/v1558977800/cap-amer_dz6cff.jpg',
        title: 'Captain America',
        author: 'Jordan'
    },
    {
        id: 2,
        header_image:
            'https://res.cloudinary.com/hotels-ng/image/upload/v1558978023/ironman_dwalhj.jpg',
        title: 'Ironman',
        author: 'Carl'
    },
    {
        id: 3,
        header_image:
            'https://res.cloudinary.com/hotels-ng/image/upload/v1558978027/black-widow_emwmzt.jpg',
        title: 'Black Widow',
        author: 'Chris'
    },
    {
        id: 4,
        header_image:
            'https://res.cloudinary.com/hotels-ng/image/upload/v1558978032/thor_krwpdg.jpg',
        title: 'Thor',
        author: 'Matt'
    }
];


class SinglePostPage extends Component {
    state = { commentValue: '' };


    // add this method
    static async getInitialProps({ query }) {
        const { id } = query;
        const post = posts.find(post => post.id == id)
        return { post }
    }

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
        const { post } = this.props; // add this

        return (
            <PageLayout>
                <div style={{ textAlign: 'right', marginBottom: 16 }}>
                    <Link href={`/post/edit?id=${post.id}`} as={`/post/${post.id}/edit`}>
                        <Button type="primary">Edit Post</Button>
                    </Link>
                </div>
                <div className="hero">

                    <h1 className="hero__text">{post.title}</h1>
                    <img
                        className="hero__image"
                        src={post.header_image}
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