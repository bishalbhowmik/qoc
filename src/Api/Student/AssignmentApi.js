
import axios from "axios"

export const createAssignmentApi = async (state) => {

    let assignment = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/assignment/', state, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)

    return assignment

}



export const getAllAssignmentApi = async (obj) => {

    let assignment = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/assignment/get', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)

    return assignment

}

export const createAssignmentPaymentApi = async (obj) => {

    let assignment = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/assignment/payment', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)

    return assignment

}

export const checkAssignmentPremiumApi = async () => {

    let assignment = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/assignment/check-premium', {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)

    return assignment

}
