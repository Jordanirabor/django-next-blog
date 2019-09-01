
// reducers/auth.js

import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_FULFILLED,
    LOGIN_USER_REJECTED,
    CREATE_USER_REQUEST,     // add this
    CREATE_USER_FULFILLED,   // add this
    CREATE_USER_REJECTED,    // add this
    LOGOUT_USER,            // add this
} from '../actions/actionTypes'

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    errors: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true,
                errors: null
            }

        case LOGIN_USER_FULFILLED:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGIN_USER_REJECTED:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                errors: action.payload
            }


        // Add these
        // CREATE USER
        case CREATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                errors: null,
            };
        case CREATE_USER_REJECTED:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                errors: action.payload
            };
        case CREATE_USER_FULFILLED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                isAuthenticated: true
            };


        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }

        default:
            return state
    }
}

export default authReducer