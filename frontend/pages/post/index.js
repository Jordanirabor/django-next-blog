
// pages/post/index.js

import React, { Component } from 'react';
import Link from 'next/link'; // add this
import { Avatar, Button } from 'antd';
import PageLayout from '../../components/PageLayout';
import CommentSection from '../../components/CommentSection';
import moment from 'moment';                           // add this
import { connect } from 'react-redux';                  // add this
import { fetchPost } from '../../actions/activePost';   // add this


class SinglePostPage extends Component {
    state = { commentValue: '' };



    // update this method
    static async getInitialProps({ query, store }) {
        const { id } = query
        await store.dispatch(fetchPost(id));
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
        const { comments } = post    // add this

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

                    <div className="author-box">
                        <Avatar size={48} className="author-box__image">
                            {post.author[0].toUpperCase()}
                        </Avatar>
                        <div className="author-box__text">
                            <h3>{post.author}</h3>
                            {/* Add this */}
                            <small>{moment(post.created).format('MMMM DD YYYY')}</small>
                        </div>
                    </div>
                </div>
                <section className="post-content">
                    {/* Add this */}
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
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

// add this
const mapStateToProps = state => ({
    post: state.activePost.data
});

// update this
export default connect(mapStateToProps, null)(SinglePostPage)