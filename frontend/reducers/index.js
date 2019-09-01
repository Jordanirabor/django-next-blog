
// reducers/index.js

import { combineReducers } from 'redux'
import postsReducer from './posts'
import activePostReducer from './activePost' // add this

const rootReducer = combineReducers({
  posts: postsReducer,
  activePost: activePostReducer        // add this
})

export default rootReducer