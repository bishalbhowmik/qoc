import axios from "axios"

export const addCurriculumApi = async (obj) => {

    let curriculum = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/curriculum/', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return curriculum

}


export const getAllCurriculumApi = async () => {

    let curriculum = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/curriculum/', {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)


    return curriculum

}

export const getACurriculumApi = async (id) => {

    let curriculum = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/curriculum/' + id, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)


    return curriculum

}

export const removeCurriculumOutlineApi = async (curriculumId, pos) => {

    let curriculum = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/curriculum/remove-outline/' + curriculumId + '/' + pos, {}, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)


    return curriculum

}


export const addCurriculumOutlineApi = async (curriculumId, obj) => {

    let curriculum = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/curriculum/add-outline/' + curriculumId, obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return curriculum

}


export const deleteCurriculumApi = async (id) => {

    let curriculum = axios.delete(process.env.REACT_APP_BACKEND_URL + '/api/curriculum/' + id, {

        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }

    }).then(data => data.data)


    return curriculum

}