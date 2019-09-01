
// pages/auth.js

import React, { Component } from "react";
import { Col, Card, Row, Button, Input, Icon, Typography, notification } from "antd";
import { connect } from 'react-redux'        // add this
import { loginUser, createUser } from '../actions/auth' // add createUser
import Router from 'next/router'            // add this
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


  // add this method
  handleSubmit = async () => {
    const { username, password, action } = this.state
    if (action == 'Login') {
      await this.props.loginUser({ username, password })
    }

    // add this conditional statement
    if (action == 'Register') {
      await this.props.createUser({ username, password })
    }

    // add this method
    if (this.props.errors) {
      for (let msg of this.props.errors) {
        notification.error({
          message: msg,
          duration: 3
        })
      }
      return;
    }
    // add this method
    if (this.props.isAuthenticated) {
      const infoMsg = `${action == 'Login' ? 'Logged in' : 'Created'} Successfully`
      notification.success({
        message: infoMsg,
        duration: 3
      })
      Router.push('/')
    }
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

              <Button
                onClick={this.handleSubmit}
                loading={this.props.loading}
                type='primary'>
                Submit
          </Button>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}


// add this
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  errors: state.auth.errors
})

// add this
const mapDispatchToProps = { loginUser, createUser }     // add createUser

// add this
export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)