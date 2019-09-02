
// pages/post/index.js

import React, { Component } from 'react';
import Link from 'next/link'; // add this
import { Avatar, Button } from 'antd';
import PageLayout from '../../components/PageLayout';
import CommentSection from '../../components/CommentSection';
import moment from 'moment';                           // add this
import { connect } from 'react-redux';                  // add this
import { fetchPost, createComment } from "../../actions/activePost";


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


    handleSubmit = async () => {
        const { commentValue } = this.state;
        const {
            post: { id },
            createComment
        } = this.props;

        if (!commentValue) {
            return;
        }
        await createComment({ content: commentValue, post: id });
        this.setState({ commentValue: "" });
    };

    render() {
        const { commentValue } = this.state;
        const { post, user, loading } = this.props;   // add loading
        const { comments } = post    // add this

        return (
            <PageLayout>
                <div style={{ textAlign: 'right', marginBottom: 16 }}>
                    {user && user.username == post.author ? (
                        <Link
                            href={`/post/edit?id=${post.id}`}
                            as={`/post/${post.id}/edit`}
                        >
                            <Button type="primary">Edit Post</Button>
                        </Link>
                    ) : null}
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
                        submitting={loading}    // update this
                        user={user && user.username}    // update this
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


const mapStateToProps = state => ({
    post: state.activePost.data,
    user: state.auth.user,
    loading: state.activePost.loading    // add this
});

// add this
const mapDispatchToProps = {
    createComment
}

export default connect(
    mapStateToProps,
    mapDispatchToProps  //update this
)(SinglePostPage);