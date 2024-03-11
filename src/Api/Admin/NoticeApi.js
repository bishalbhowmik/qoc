

import axios from "axios"

export const createNoticeApi = async (obj) => {

    let notice = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/notice', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })


    return notice

}


export const getNoticeApi = async (obj) => {

    let notice = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/notice/get', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })


    return notice

}

export const deleteNoticeApi = async (id) => {

    let notice = axios.delete(process.env.REACT_APP_BACKEND_URL + '/api/notice/' + id, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })


    return notice

}