import axios from "axios"


export const getAllBatchApi = async (obj) => {

    let batch = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/batch/get', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data)

    return batch

}
