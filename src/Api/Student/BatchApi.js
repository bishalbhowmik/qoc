import axios from "axios"


export const getAllBatchApi = async (obj) => {

    let batch = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/batch/get', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)

    return batch

}


export const joiningBatchApi = async (obj) => {

    let batch = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/batch/join/payment', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)

    return batch

}


export const getEnrolledBatchApi = async (id) => {

    let batch = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/batch/enroll/' + id, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)

    return batch

}


export const getBatchDashboardApi = async (batchId, str) => {

    let batch = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/batch/dashboard/' + batchId + '/' + str, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)

    return batch

}


export const createAnnouncementApi = async (batchId, obj) => {

    let announcement = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/batch/announcement/' + batchId, obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)

    return announcement

}