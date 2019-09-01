
// hocs/withAuthSync.js

import React, { Component } from "react";
import Router from "next/router";
import { loginWithJWT } from "../actions/auth";

const getDisplayName = WrappedComponent => {
  const { displayName, name } = WrappedComponent;
  return displayName || name || "Component";
};

const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;
    
    static async getInitialProps(ctx){
        const componentProps =
          WrappedComponent.getInitialProps &&
          (await WrappedComponent.getInitialProps(ctx));
        
        return { ...componentProps }
    }

    async componentDidMount() {
      const { store } = this.props;
      await store.dispatch(loginWithJWT());
      const { isAuthenticated }  = store.getState().auth
      if (!isAuthenticated) {
        Router.push("/auth");
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withAuthSync;