import axios from "axios"


export const getAllTuitionApi = async (obj) => {

    let Tuition = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/tuition/', {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })


    return Tuition

}


export const approveTuitionApi = async (id) => {

    let Tuition = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/tuition/approve/' + id, {}, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })


    return Tuition

}

export const confirmTuitionApi = async (TuitionId, confirmedTeacherId) => {

    let Tuition = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/tuition/confirm/' + TuitionId, { confirmedTeacherId: confirmedTeacherId }, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })


    return Tuition

}



export const updateTuitionApi = async (TuitionId, obj) => {

    let Tuition = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/tuition/update/' + TuitionId, obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })


    return Tuition

}