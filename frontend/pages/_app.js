
// pages/_app.js

import App, { Container } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import createStore from '../store';
import { loginWithJWT } from '../actions/auth'       // add this

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }


  // add this
  async componentDidMount() {
    const { store } = this.props;
    await store.dispatch(loginWithJWT())
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} store={store} />
        </Provider>
      </Container>
    );
  }
}
export default withRedux(createStore)(MyApp);