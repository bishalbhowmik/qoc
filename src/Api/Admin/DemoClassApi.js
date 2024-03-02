
import axios from "axios"


export const createDemoClassApi = async (obj) => {

    let demoClass = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/demo-class', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return demoClass

}


export const getDemoClassApi = async () => {

    let demoClass = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/demo-class/', {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return demoClass

}


export const updateDemoClassApi = async (demoClassId, obj) => {

    let demoClass = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/demo-class/' + demoClassId, obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return demoClass

}


export const removeDemoClassApi = async (demoClassId) => {

    let demoClass = axios.delete(process.env.REACT_APP_BACKEND_URL + '/api/demo-class/' + demoClassId, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data)


    return demoClass

}