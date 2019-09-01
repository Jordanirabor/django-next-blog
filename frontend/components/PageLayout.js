
// components/PageLayout.js

import React from 'react';
import Link from 'next/link'        // add this
import { Layout, Row, Col, Typography, Button } from 'antd';
const { Header, Content } = Layout;
const { Title } = Typography;
import { connect } from 'react-redux';  // add this

const PageLayout = ({ children, user }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ color: '#fff', height: 60 }}>
                <Row type="flex" justify="center">
                    <Col
                        span={20}
                        xs={24}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Title
                            level={3}
                            style={{
                                color: '#fff',
                                marginBottom: 0,
                                marginRight: 'auto',
                                lineHeight: '60px'
                            }}
                        >
                            MarvelBlogly
            </Title>

                        <div>
                            {/* Add this */}
                            {
                                !user ?
                                    <Link href="/auth">
                                        <Button type="primary">Auth</Button>
                                    </Link> :
                                    <h3 style={{ color: '#fff' }}> {user && user.username} </h3>
                            }
                        </div>
                    </Col>
                </Row>
            </Header>
            <Content style={{ padding: '32px 0' }}>
                <Row type="flex" justify="center">
                    <Col span={20}>{children}</Col>
                </Row>
            </Content>
        </Layout>
    );
};


const mapStateToProps = state => ({                          // add this
    user: state.auth.user
})

export default connect(mapStateToProps, null)(PageLayout);   // add this