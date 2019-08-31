
// pages/create.js

import React, { Component } from "react";
import dynamic from "next/dynamic";             // add this
import { Button, Col, Icon, Input, Modal, Row, Upload, Typography } from "antd";
import PageLayout from "../components/PageLayout";

const { Title } = Typography;
const Editor = dynamic(() => import("../components/Editor"), { // add this
    ssr: false
  });

class CreatePage extends Component {
    state = { title: '', fileList: [], editorHtml: '' };  // add editorHtml and title to state

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
                            <Button type="primary"> Post </Button>
                        </div>
                    </Col>
                </Row>
            </PageLayout>
        );
    }
}
export default CreatePage;