import axios from "axios"


export const createResourceApi = async (obj) => {

    let resource = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/resource', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return resource

}


export const getResourceApi = async (obj) => {

    let resource = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/resource/get', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return resource

}


export const updateResourceApi = async (resourceId, obj) => {

    let resource = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/resource/' + resourceId, obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return resource

}


export const removeResourceApi = async (resourceId) => {

    let resource = axios.delete(process.env.REACT_APP_BACKEND_URL + '/api/resource/' + resourceId, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return resource

}