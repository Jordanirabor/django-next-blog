
// reducers/activePost.js

import {
    FETCH_POST_REQUEST,
    FETCH_POST_FULFILLED,
    FETCH_POST_REJECTED,
    CREATE_POST_REQUEST,      // add this
    CREATE_POST_FULFILLED,    // add this
    CREATE_POST_REJECTED,     // add this
    EDIT_POST_REQUEST,      // add this
    EDIT_POST_FULFILLED,    // add this
    EDIT_POST_REJECTED,     // add this
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_FULFILLED,
    CREATE_COMMENT_REJECTED,
} from '../actions/actionTypes.js'

const initialState = {
    data: null,
    loading: false,
    errors: null
}

const activePostReducer = (state = initialState, action) => {
    switch (action.type) {
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

        // add this
        case CREATE_POST_REQUEST:
            return { ...state, loading: true }

        // add this
        case CREATE_POST_FULFILLED:
            return { ...state, loading: false }

        // add this
        case CREATE_POST_REJECTED:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }


        // add these
        case EDIT_POST_REQUEST:
            return { ...state, loading: true }

        case EDIT_POST_FULFILLED:
            return { ...state, loading: false }

        case EDIT_POST_REJECTED:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }


        // add this    
        case CREATE_COMMENT_REQUEST:
            return { ...state, loading: true }

        // add this
        case CREATE_COMMENT_FULFILLED:
            return { ...state, loading: false }

        // add this
        case CREATE_COMMENT_REJECTED:
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