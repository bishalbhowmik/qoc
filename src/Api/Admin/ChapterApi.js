import axios from "axios"



export const getChaptersApi = async (subjectId) => {

    let curriculum = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/chapter/' + subjectId, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)


    return curriculum

}


export const createChapterApi = async (obj) => {

    let curriculum = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/chapter/', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return curriculum

}



export const getAChapterApi = async (chapterId) => {

    let curriculum = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/chapter/get-chapter/' + chapterId, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)


    return curriculum

}



export const removeChapterMaterialsApi = async (chapterId, pos) => {

    let chapter = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/chapter/remove-material/' + chapterId + '/' + pos, {}, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)


    return chapter

}


export const addChapterMaterialsApi = async (chapterId, obj) => {

    let chapter = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/chapter/add-material/' + chapterId, obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return chapter

}