import axios from "axios"

export const getApprovedTuitionApi = async (id) => {

    let data = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/tuition/approved', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME)
        }
    }).then(data => data.data)

    return data
}


export const applyTuitionApi = async (tuitionId, teacherId) => {

    let data = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/tuition/apply/' + tuitionId, { _id: teacherId }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME)
        }
    }).then(data => data.data)

    return data
}

export const getConfirmedTuitionApi = async (teacherId) => {

    let data = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/teacher/confirmed-tuition/' + teacherId, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME)
        }
    }).then(data => data.data)

    return data
}