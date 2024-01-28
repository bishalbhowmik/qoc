
import axios from "axios"


export const updateTeacherInfoApi = async (id, state) => {

    let data = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/teacher/' + id, state, {
        headers: {
            "Content-Type": 'multipart/form-data',
            Authorization: localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME)
        }
    }).then(data => data.data)

    return data
}