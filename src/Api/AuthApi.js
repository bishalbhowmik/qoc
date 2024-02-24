import axios from "axios"


export const signinApi = (obj) => {

    let data = axios.post(process.env.REACT_APP_BACKEND_URL + "/api/auth/signin", obj).then(data => data.data)

    return data

}


export const signupApi = (obj) => {

    let data = axios.post(process.env.REACT_APP_BACKEND_URL + "/api/auth/signup", obj).then(data => data.data)

    return data

}