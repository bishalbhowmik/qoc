import axios from "axios"


export const getAllAssignmentApi = async (obj) => {

    let assignment = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/assignment/get', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data).catch(err => {
            return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
        })

    return assignment

}

export const submitSolutionApi = async (id, obj) => {

    let assignment = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/assignment/' + id, obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data).catch(err => {
            return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
        })

    return assignment

}