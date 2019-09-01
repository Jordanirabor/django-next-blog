
// actions/auth.js

import axios from 'axios'
import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_REJECTED,
    LOGIN_USER_FULFILLED,
    CREATE_USER_REQUEST,     // add this      
    CREATE_USER_REJECTED,    // add this
    CREATE_USER_FULFILLED,    // add this
    LOGOUT_USER,             // add this
} from './actionTypes'
import { getErrors, BASE_URL } from '../utils'

const loginUserApiUrl = `${BASE_URL}/api/auth/jwt/create`
const fetchUserApiUrl = `${BASE_URL}/api/auth/users/me`
const createUserApiUrl = `${BASE_URL}/api/auth/users` // add this
const verifyJwtApiUrl = `${BASE_URL}/api/auth/jwt/verify` // add this

// THUNKS
const loginUser = data => {
    return async (dispatch, getState) => {
        dispatch(loginUserRequest())
        try {
            let response = await axios.post(`${loginUserApiUrl}/`, data);
            const token = response.data.access
            localStorage.setItem('token', token)

            let userResponse = await axios.get(`${fetchUserApiUrl}/`, {
                headers: { Authorization: `JWT ${token}` }
            })

            return dispatch(loginUserFulfilled(userResponse.data))
        }
        catch (e) {
            const errors = getErrors(e)
            return dispatch(loginUserRejected(errors))
        }
    }
}


// add this Thunk
const loginWithJWT = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                return dispatch(logoutUser())
            }
            let response = await axios.post(`${verifyJwtApiUrl}/`, { token });
            if (response.status == 200) {
                let userResponse = await axios.get(
                    `${fetchUserApiUrl}/`,
                    {
                        headers: { Authorization: `JWT ${token}` }
                    }
                );
                await dispatch(loginUserFulfilled(userResponse.data))
            }
        } catch (e) {
            localStorage.removeItem('token')
            return dispatch(logoutUser());
        }
    }
}


//add this
const createUser = data => {
    return async dispatch => {
        dispatch(createUserRequest())
        try {
            // create user
            let userResponse = await axios.post(`${createUserApiUrl}/`, data);
            // get jwt token
            let tokenResponse = await axios.post(`${loginUserApiUrl}/`, data);
            const token = tokenResponse.data.access;
            localStorage.setItem("token", token);
            return dispatch(createUserFulfilled(userResponse.data));
        }
        catch (e) {
            const errors = getErrors(e)
            dispatch(createUserRejected(errors))
        }
    }
}

// ACTION CREATORS
const loginUserRequest = () => ({ type: LOGIN_USER_REQUEST })
const loginUserRejected = errors => {
    return { type: LOGIN_USER_REJECTED, payload: errors };
};
const loginUserFulfilled = user => {
    return { type: LOGIN_USER_FULFILLED, payload: user };
};


const createUserRequest = () => ({ type: CREATE_USER_REQUEST })
const createUserRejected = errors => ({
    type: CREATE_USER_REJECTED,
    payload: errors
});
const createUserFulfilled = user => ({
    type: CREATE_USER_FULFILLED,
    payload: user
})
const logoutUser = () => ({ type: LOGOUT_USER })

export { createUser, loginUser, loginWithJWT } // add loginWithJWT