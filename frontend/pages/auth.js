
// pages/auth.js

import React, { Component } from "react";
import { Col, Card, Row, Button, Input, Icon, Typography } from "antd";
const ButtonGroup = Button.Group;
const { Title } = Typography;
class AuthPage extends Component {
  state = {
    action: "Register",
    username: '',
    password: ''
  };

  setAuthState = action => {
    this.setState({ action });
  };

  handleChange = e => {
      const { name, value } = e.target
      this.setState({ [name]: value })
  }

  render() {
    const { action } = this.state;
    return (
      <Row
        type="flex"
        justify="center"
        style={{ height: "100vh", backgroundColor: "#F0F2F5" }}
      >
        <Col span={7} xs={20} md={12} lg={7} style={{ marginTop: "20vh" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Title level={1}>{action}</Title>
          </div>
          <Card style={{ width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <ButtonGroup>
                <Button
                  className={action == "Register" ? "ant-btn-primary" : ""}
                  onClick={() => this.setAuthState("Register")}
                >
                  Register
                </Button>
                <Button
                  className={action == "Login" ? "ant-btn-primary" : ""}
                  onClick={() => this.setAuthState("Login")}
                >
                  Login
                </Button>
              </ButtonGroup>
              <div style={{ marginTop: 32, marginBottom: 32 }}>
                <Input
                  style={{ marginBottom: 16 }}
                  name="username"
                  onChange={this.handleChange}
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  name="password"
                  onChange={this.handleChange}
                  placeholder="Password"
                  type="password"
                />
              </div>
              <Button type="primary">Submit</Button>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AuthPage;