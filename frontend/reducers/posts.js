
// reducers/posts.js

import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_FULFILLED,
    FETCH_POSTS_REJECTED
  } from '../actions/actionTypes'
  
  const initialState = {
    data: [],
    loading: false,
    errors: null
  }
  
  const postsReducer = (state=initialState, action) => {
    switch(action.type){
      case FETCH_POSTS_REQUEST:
        return {
          ...state,
          loading: true,
          errors: null
        };
      
      case FETCH_POSTS_FULFILLED:
        return {
          ...state,
          loading: false,
          data: action.payload
        };
  
      case FETCH_POSTS_REJECTED:
        return {
          ...state,
          loading: false,
          payload: action.payload
        };
  
      default:
        return state;
    }
  }
  
  export default postsReducer;