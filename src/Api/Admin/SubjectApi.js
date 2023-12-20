import axios from "axios"



export const getSubjectsApi = async (curriculumId) => {

    let curriculum = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/subject/' + curriculumId, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)


    return curriculum

}


export const createSubjectsApi = async (obj) => {

    let curriculum = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/subject/', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return curriculum

}