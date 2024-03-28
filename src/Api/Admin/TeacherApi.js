

import axios from 'axios'

export const getTeacher = async (obj) => {

    let teacher = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/teacher/get', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })


    return teacher

}

export const setPremiumApi = async (id) => {

    let teacher = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/teacher/set-premium/' + id, {}, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })


    return teacher

}


export const deleteTeacherApi = async (id) => {

    let teacher = axios.delete(process.env.REACT_APP_BACKEND_URL + '/api/teacher/' + id, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })

    return teacher

}
