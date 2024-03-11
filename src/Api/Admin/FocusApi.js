import axios from "axios"



export const updateFocusApi = async (focusId, obj) => {

    let focus = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/focus/' + focusId, obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data).catch(err => {
            return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
        })


    return focus

}


export const createFocusApi = async (obj) => {

    let focus = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/focus', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data).catch(err => {
            return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
        })


    return focus

}


export const getFocusApi = async (obj) => {

    let focus = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/focus/get', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data).catch(err => {
            return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
        })


    return focus

}

export const removeFocusApi = async (focusId) => {

    let focus = axios.delete(process.env.REACT_APP_BACKEND_URL + '/api/focus/' + focusId, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data).catch(err => {
            return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
        })


    return focus

}