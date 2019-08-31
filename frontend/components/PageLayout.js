
// components/PageLayout.js

import React from 'react';
import Link from 'next/link'        // add this
import { Layout, Row, Col, Typography, Button } from 'antd';
const { Header, Content } = Layout;
const { Title } = Typography;

const PageLayout = ({ children }) => {
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
                            <Link href='/auth'>
                                <Button href="/auth" type="primary">
                                    Auth
              </Button>
                            </Link>
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

export default PageLayout;