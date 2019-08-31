
// pages/index.js

import React, { Component } from 'react'
import { Row, Col, Button } from 'antd';
import Link from 'next/link'; // add this
import PageLayout from '../components/PageLayout';
import PostCard from '../components/PostCard';

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

class HomePage extends Component {
    render() {
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

export default HomePage;