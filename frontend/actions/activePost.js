
// actions/activePost.js
import axios from 'axios'
import { 
  FETCH_POST_REQUEST,
  FETCH_POST_FULFILLED,
  FETCH_POST_REJECTED
} from './actionTypes'
import { getErrors, BASE_URL } from '../utils'

const postsApiUrl = `${BASE_URL}/api/posts`

// THUNKS
const fetchPost = (id) => {
  return async (dispatch) => {
    dispatch(fetchPostRequest())
    try {
      let response = await axios.get(`${postsApiUrl}/${id}`)
      return dispatch(fetchPostFulfilled(response.data))     
    } catch(e){
      const errors = getErrors(e)
      dispatch(fetchPostRejected(errors))
    }
  }
}

// Action creators
const fetchPostRequest = () => ({ type: FETCH_POST_REQUEST })
const fetchPostFulfilled = post => ({ 
  type: FETCH_POST_FULFILLED, 
  payload: post
})
const fetchPostRejected = () => ({ type: FETCH_POST_REJECTED }) 

export { fetchPost }