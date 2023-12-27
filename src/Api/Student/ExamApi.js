import axios from "axios"



export const getExamByIdApi = async (studentId) => {

    let exam = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/exam/student/' + studentId, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)

    return exam

}



export const submitExamApi = async (examId, obj) => {

    let exam = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/exam/submit/' + examId, obj ,{
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)

    return exam

}


export const getAExamMarksApi = async (examId, studentId) => {

    let exam = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/exam/' + examId + '/' + studentId, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)

    return exam

}

