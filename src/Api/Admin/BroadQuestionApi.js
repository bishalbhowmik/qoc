import axios from "axios"



export const createBroadQuestionApi = async (state) => {


    let obj = {
        question: state.question,
        answer: state.answer,
        difficulty: state.difficulty,
        curriculumId: state.curriculumId,
        subjectId: state.subjectId,
        chapterId: state.chapterId,
        moduleId: state.moduleId,
    }

    let data = axios.post(process.env.REACT_APP_BACKEND_URL + "/api/broad-question/", obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)

    return data

}


export const getBroadQuestionApi = async (obj) => {

    let data = axios.post(process.env.REACT_APP_BACKEND_URL + "/api/broad-question/get", obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)

    return data

}