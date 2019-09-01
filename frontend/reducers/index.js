
// reducers/index.js

import { combineReducers } from 'redux'
import postsReducer from './posts'
import activePostReducer from './activePost' // add this
import authReducer from './auth'    // add this

const rootReducer = combineReducers({
  posts: postsReducer,
  activePost: activePostReducer,        // add this
  auth: authReducer                     // add this
})

export default rootReducer