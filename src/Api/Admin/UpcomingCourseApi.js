import axios from "axios"

export const createUpcomingCourseApi = async (obj) => {

    let upcomingCourse = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/upcoming-course', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })


    return upcomingCourse

}


export const getUpcomingCourseApi = async () => {

    let upcomingCourse = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/upcoming-course/', {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })


    return upcomingCourse

}

export const removeUpcomingCourseApi = async (id) => {

    let data = axios.delete(process.env.REACT_APP_BACKEND_URL + '/api/upcoming-course/' + id, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })


    return data

}