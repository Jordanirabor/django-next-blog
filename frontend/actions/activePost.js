
// actions/activePost.js
import axios from 'axios'
import {
  FETCH_POST_REQUEST,
  FETCH_POST_FULFILLED,
  FETCH_POST_REJECTED,
  CREATE_POST_REQUEST,     // add this
  CREATE_POST_FULFILLED,   // add this
  CREATE_POST_REJECTED,    // add this
  EDIT_POST_REQUEST,       // add this
  EDIT_POST_FULFILLED,     // add this
  EDIT_POST_REJECTED,      // add this
  // add these,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_FULFILLED,
  CREATE_COMMENT_REJECTED,
} from './actionTypes'
import { getErrors, BASE_URL } from '../utils'

const postsApiUrl = `${BASE_URL}/api/posts`
const commentsApiUrl = `${BASE_URL}/api/comments`; // add this

// THUNKS
const fetchPost = (id) => {
  return async (dispatch) => {
    dispatch(fetchPostRequest())
    try {
      let response = await axios.get(`${postsApiUrl}/${id}`)
      return dispatch(fetchPostFulfilled(response.data))
    } catch (e) {
      const errors = getErrors(e)
      dispatch(fetchPostRejected(errors))
    }
  }
}

// add this
const createPost = data => {
  return async (dispatch) => {
    dispatch(createPostRequest())
    try {
      const token = localStorage.getItem('token');
      let response = await axios.post(`${postsApiUrl}/`, data, {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      dispatch(createPostFulfilled())
      return response.data.id
    } catch (e) {
      let messages = getErrors(e)
      return dispatch(createPostRejected(messages));
    }
  }
}


const editPost = (postId, data) => {
  return async (dispatch) => {
    dispatch(editPostRequest());
    try {
      const token = localStorage.getItem("token");

      let response = await axios.patch(`${postsApiUrl}/${postId}/`, data, {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      dispatch(editPostFulfilled());
      return response.data.id
    } catch (e) {
      const messages = getErrors(e);
      return dispatch(editPostRejected(messages));
    }
  };
};


// add this
const createComment = data => {
  return async (dispatch, getState) => {
    dispatch(createCommentRequest());
    try {
      const token = localStorage.getItem("token");
      let response = await axios.post(
        `${commentsApiUrl}/`,
        { ...data },
        { headers: { Authorization: `JWT ${token}` } }
      );
      await dispatch(fetchPost(data.post))
      return dispatch(createCommentFulfilled());
    } catch (e) {
      let messages = getErrors(e);
      return dispatch(createCommentRejected(messages));
    }
  };
};



// Action creators
const fetchPostRequest = () => ({ type: FETCH_POST_REQUEST })
const fetchPostFulfilled = post => ({
  type: FETCH_POST_FULFILLED,
  payload: post
})
const fetchPostRejected = () => ({ type: FETCH_POST_REJECTED })

// add these
const createPostRequest = () => ({ type: CREATE_POST_REQUEST })       // add this
const createPostRejected = errorMsg => ({                             // add this
  type: CREATE_POST_REJECTED,
  payload: errorMsg
})
const createPostFulfilled = () => ({ type: CREATE_POST_FULFILLED })  // add this

// add these action creators
const editPostRequest = () => ({ type: EDIT_POST_REQUEST })
const editPostRejected = errorMsg => ({
  type: EDIT_POST_REJECTED,
  payload: errorMsg
})
const editPostFulfilled = () => ({ type: EDIT_POST_FULFILLED })

//add these
const createCommentRequest = () => ({ type: CREATE_COMMENT_REQUEST });
const createCommentRejected = errorMsg => ({ 
    type: CREATE_COMMENT_REJECTED, 
    payload: errorMsg 
});
const createCommentFulfilled = () => ({ type: CREATE_COMMENT_FULFILLED });

export { fetchPost, createPost, editPost, createComment }; // add createComment