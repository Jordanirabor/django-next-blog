
// reducers/activePost.js

import {
    FETCH_POST_REQUEST,
    FETCH_POST_FULFILLED,
    FETCH_POST_REJECTED
  } from '../actions/actionTypes.js'
  
  const initialState = {
    data: null,
    loading: false,
    errors: null
  }
  
  const activePostReducer = ( state=initialState, action ) => {
    switch(action.type){
      case FETCH_POST_REQUEST:
        return {
          ...state,
          loading: true,
          errors: null
        }
      
      case FETCH_POST_FULFILLED:
        return {
          ...state,
          loading: false,
          data: action.payload
        }
  
      case FETCH_POST_REJECTED:
        return {
          ...state,
          loading: false,
          errors: action.payload
        }
      
      default:
        return state
    }
  }
  
  export default activePostReducer;