
// pages/index.js

import React, { Component } from 'react'
import { Row, Col, Button } from 'antd';
import Link from 'next/link'; // add this
import PageLayout from '../components/PageLayout';
import PostCard from '../components/PostCard';
import { connect } from "react-redux";            // add this
import { fetchPosts } from "../actions/posts";    // add this



class HomePage extends Component {

    // add this
    static async getInitialProps(ctx) {
        const { store } = ctx;
        await store.dispatch(fetchPosts())
    }

    render() {
        const { posts } = this.props  // add this
        return (
            <PageLayout>
                <Row style={{ marginBottom: 64 }}>
                    <Col span={24} style={{ textAlign: "right" }}>
                        <Link href='/create'>
                            <Button href="/create" type="primary">
                                Create Post
            </Button>
                        </Link>
                    </Col>
                </Row>
                <Row gutter={16}>
                    {posts.map((post, id) => {
                        return (
                            <Col
                                key={id}
                                span={8}
                                md={8}
                                sm={12}
                                xs={24}
                                style={{ marginBottom: 16 }}
                            >
                                <PostCard {...post} />
                            </Col>
                        );
                    })}
                </Row>
            </PageLayout>
        );
    }
}


// add this
const mapStateToProps = state => ({
    posts: state.posts.data
})

// update this
export default connect(mapStateToProps, null)(HomePage) 