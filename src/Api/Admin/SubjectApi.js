import axios from "axios"



export const getSubjectsApi = async (curriculumId) => {

    let curriculum = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/subject/' + curriculumId, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)


    return curriculum

}


export const getASubjectsApi = async (subjectId) => {

    let curriculum = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/subject/get-subject/' + subjectId, {
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



export const removeSubjectOutlineApi = async (curriculumId, pos) => {

    let curriculum = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/subject/remove-outline/' + curriculumId + '/' + pos, {}, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)


    return curriculum

}


export const addSubjectOutlineApi = async (curriculumId, obj) => {

    let curriculum = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/subject/add-outline/' + curriculumId, obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return curriculum

}

export const removeSubjectMaterialsApi = async (subjectId, pos) => {

    let subject = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/subject/remove-material/' + subjectId + '/' + pos, {}, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)


    return subject

}


export const addSubjectMaterialsApi = async (subjectId, obj) => {

    let subject = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/subject/add-material/' + subjectId, obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return subject

}


export const deleteSubjectApi = async (id) => {

    let subject = axios.delete(process.env.REACT_APP_BACKEND_URL + '/api/subject/' + id, {

        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }

    }).then(data => data.data)


    return subject

}