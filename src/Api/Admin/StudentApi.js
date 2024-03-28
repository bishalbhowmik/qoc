import axios from "axios"


export const setAssignmentPremiumApi = async (id) => {

    let student = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/student/set-assignment-premium/' + id, {}, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })


    return student

}


export const setCoursePremiumApi = async (id) => {

    let student = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/student/set-course-premium/' + id, {}, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })


    return student

}


export const deleteStudentApi = async (id) => {

    let batch = axios.delete(process.env.REACT_APP_BACKEND_URL + '/api/student/' + id, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })

    return batch

}
