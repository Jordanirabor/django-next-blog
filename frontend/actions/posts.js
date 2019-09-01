
// actions/posts.js
import axios from 'axios'
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_FULFILLED,
  FETCH_POSTS_REJECTED
} from './actionTypes'
import { getErrors, BASE_URL } from '../utils'

const postsApiUrl = `${BASE_URL}/api/posts`;

// THUNKS
const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest())
    try {
      let response = await axios.get(`${postsApiUrl}/`)
      return dispatch(fetchPostsFulfilled(response.data))     
    } catch(e){
      const errors = getErrors(e)
      dispatch(fetchPostsRejected(errors))
    }
  }
}

// Action creators
const fetchPostsRequest = () => ({ type: FETCH_POSTS_REQUEST })
const fetchPostsFulfilled = posts => ({ 
  type: FETCH_POSTS_FULFILLED, 
  payload: posts
})
const fetchPostsRejected = (errors) => ({ 
  type: FETCH_POSTS_REJECTED,
  payload: errors,
}) 

export { fetchPosts }