import axios from "axios"



export const getModulesApi = async (chapterId) => {

    let curriculum = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/module/' + chapterId, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data).catch(err => {
            return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
        })


    return curriculum

}


export const createModuleApi = async (obj) => {

    let curriculum = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/module/', obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data).catch(err => {
            return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
        })


    return curriculum

}



export const getAModuleApi = async (moduleId) => {

    let module = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/module/get-module/' + moduleId, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data).catch(err => {
            return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
        })


    return module

}



export const removeModuleMaterialsApi = async (moduleId, pos) => {

    let module = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/module/remove-material/' + moduleId + '/' + pos, {}, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
        }
    }).then(data => data.data).catch(err => {
            return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
        })


    return module

}


export const addModuleMaterialsApi = async (moduleId, obj) => {

    let module = axios.put(process.env.REACT_APP_BACKEND_URL + '/api/module/add-material/' + moduleId, obj, {
        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => data.data).catch(err => {
            return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
        })

    return module

}

export const deleteModuleApi = async (id) => {

    let module = axios.delete(process.env.REACT_APP_BACKEND_URL + '/api/module/' + id, {

        headers: {
            Authorization: window.localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME),
            // "Content-Type": 'multipart/form-data'
        }

    }).then(data => data.data).catch(err => {
            return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
        })


    return module

}