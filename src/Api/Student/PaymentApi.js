import axios from "axios"



export const createCoursePaymentApi = async (obj) => {

    let payment = axios.post(process.env.REACT_APP_BACKEND_URL + '/api/student/course/payment', obj, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME)
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })

    return payment
}


export const getTransactionApi = async (id) => {

    let payment = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/transaction/' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME)
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })

    return payment
}