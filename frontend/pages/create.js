
// pages/create.js

import React, { Component } from "react";
import dynamic from "next/dynamic";             // add this
import { Button, Col, Icon, Input, Modal, Row, Upload, Typography, notification } from "antd";
import PageLayout from "../components/PageLayout";
import withAuthSync from "../hocs/withAuthSync"; // add this
import { connect } from 'react-redux'               // add this
import Router from 'next/router'                    // add this
import { createPost } from '../actions/activePost'  // add this

const { Title } = Typography;
const Editor = dynamic(() => import("../components/Editor"), { // add this
    ssr: false
});

class CreatePage extends Component {
    state = { title: '', fileList: [], editorHtml: '' };  // add editorHtml and title to state


    // add this method
    handleSubmit = async () => {
        const { title, editorHtml, fileList } = this.state;

        let formData = new FormData()
        formData.append('title', title)
        formData.append('content', editorHtml)
        formData.append('header_image', fileList[0] && fileList[0].originFileObj)

        const postId = await this.props.createPost(formData)

        if (this.props.errors) {
            for (let msg of this.props.errors) {
                notification.error({
                    message: msg,
                    duration: 3
                });
            }
            return;
        }
        notification.success({
            message: 'Post created successfully',
            duration: 3
        })
        Router.push(`/post/${postId}`)
    }

    handleImagePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    };

    handleEditorChange = html => {             // add this method
        this.setState({ editorHtml: html });
    };

    handleTitleChange = e => this.setState({ 'title': e.target.value }) // add this 

    handleImagePreviewCancel = () => this.setState({ previewVisible: false });

    handleImageChange = ({ fileList }) => this.setState({ fileList });

    render() {
        const { previewImage, previewVisible, fileList, title } = this.state;
        return (
            <PageLayout>
                <Title level={2}>Create Post </Title>
                <Row>
                    <Col span={24} md={10}>
                        <div style={{ marginBottom: 32 }}>
                            <Title level={4}>Blog Title</Title>
                            <Input
                                value={title}                      // add this
                                onChange={this.handleTitleChange} // add this 
                            />
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <Title level={4}>Header Image</Title>
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                beforeUpload={() => false}
                                onPreview={this.handleImagePreview}
                                onChange={this.handleImageChange}
                            >
                                {fileList.length < 1 ? (
                                    <div>
                                        <Icon type="plus" />
                                        <div className="ant-upload-text">Upload</div>
                                    </div>
                                ) : null}
                            </Upload>
                            <Modal
                                visible={previewVisible}
                                footer={null}
                                onCancel={this.handleImagePreviewCancel}
                            >
                                <img
                                    alt="image preview"
                                    style={{ width: "100%" }}
                                    src={previewImage}
                                />
                            </Modal>
                        </div>
                    </Col>
                    <Col span={20} xs={24} md={20}>
                        <div>
                            <Title level={4}>Post Content</Title>
                            <div style={{ marginBottom: 32 }}>

                                <Editor
                                    onChange={this.handleEditorChange}
                                    value={this.state.editorHtml}
                                />
                            </div>
                            {/* update the Post Button accordingly*/}
                            <Button
                                loading={this.props.loading}
                                onClick={this.handleSubmit}
                                type="primary">
                                Post
              </Button>
                        </div>
                    </Col>
                </Row>
            </PageLayout>
        );
    }
}



// add this
const mapStateToProps = state => ({
    loading: state.activePost.loading,
    errors: state.activePost.errors
})

// add this
const mapDispatchToProps = {
    createPost
}

// update this 
export default connect(mapStateToProps, mapDispatchToProps)(withAuthSync(CreatePage));