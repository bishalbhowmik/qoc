import axios from "axios"



export const createMcq = async (state) => {


    let obj = {
        question: state.question,
        options: [{ option: 'a', value: state.a }, { option: 'b', value: state.b }, { option: 'c', value: state.c }, { option: 'd', value: state.d }],
        answer: String(state.answer).toLocaleLowerCase(),
        hints: state.hints,
        difficulty: state.difficulty,
        explanation: state.explanation,
        curriculumId: state.curriculumId,
        subjectId: state.subjectId,
        chapterId: state.chapterId,
        moduleId: state.moduleId,
    }

    let data = axios.post(process.env.REACT_APP_BACKEND_URL + "/api/mcq/", obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)

    return data

}


export const getMcqByCriteriaApi = async (obj) => {

    let data = axios.post(process.env.REACT_APP_BACKEND_URL + "/api/mcq/get-by-criteria", obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)

    return data

}

export const getAllMcqApi = async (obj) => {

    let data = axios.get(process.env.REACT_APP_BACKEND_URL + "/api/mcq/", {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)

    return data

}