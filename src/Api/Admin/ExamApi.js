import axios from "axios"


export const createExamApi = async (obj) => {

    let exam = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/exam/', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return exam

}


export const getAllExamApi = async (obj) => {

    let exam = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/exam/get', obj ,{
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)

    return exam

}

export const getAExamApi = async (examId) => {

    let exam = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/exam/' + examId, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)

    return exam

}

export const updateMarksApi = async (examId, studentId, state) => {

    console.log(state)

    let exam = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/exam/' + examId + '/' + studentId, state, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)

    return exam

}
