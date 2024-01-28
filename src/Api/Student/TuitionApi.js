import axios from "axios"


export const createTuitionApi = async (obj) => {

    let data = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/tuition/create', obj, {

        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME)
        }

    }).then(data => data.data)

    return data
}



export const getStudentAllTuition = async (id) => {

    let data = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/student/all-tuition/' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME)
        }
    }).then(data => data.data)

    return data
}