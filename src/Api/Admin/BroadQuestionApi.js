import axios from "axios"



export const createBroadQuestionApi = async (state) => {

    let data = axios.post(process.env.REACT_APP_BACKEND_URL + "/api/broad-question/", state, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data).catch(err => {
            return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
        })

    return data

}


export const getBroadQuestionApi = async (obj) => {

    let data = axios.post(process.env.REACT_APP_BACKEND_URL + "/api/broad-question/get", obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data).catch(err => {
            return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
        })

    return data

}