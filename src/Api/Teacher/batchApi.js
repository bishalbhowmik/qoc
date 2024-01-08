import axios from "axios"


export const createBatchPaymentApi = async (obj) => {

    let batch = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/batch/payment', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)

    return batch

}

export const checkBatchPremiumApi = async () => {

    let batch = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/batch/check-premium', {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)

    return batch

}


export const getAllBatchApi = async (obj) => {

    let batch = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/batch/get', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)

    return batch

}


export const createBatchApi = async (obj) => {

    let batch = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/batch/', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)

    return batch

}

