import axios from "axios"


export const getAStudent = async (id) => {

    let data = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/student/' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME)
        }
    }).then(data => data.data)

    return data
}


export const updateStudent = async (id, obj) => {

    let data = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/student/' + id, obj, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME)
        }
    }).then(data => data.data)

    return data
}