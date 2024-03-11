import axios from "axios"


export const deleteBatchApi = async (id) => {

    let batch = axios.delete(process.env.REACT_APP_BACKEND_URL + '/api/batch/' + id, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })

    return batch

}

