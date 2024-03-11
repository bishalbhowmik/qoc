import axios from "axios"


export const getAllTransactionApi = async () => {

    let payment = axios.get(process.env.REACT_APP_BACKEND_URL + '/api/transaction/', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME)
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })

    return payment
}




export const deleteransactionApi = async () => {

    let transaction = axios.delete(process.env.REACT_APP_BACKEND_URL + '/api/transaction/', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN_NAME)
        }
    }).then(data => data.data).catch(err => {
        return { message: `Something went wrong. - (${err.message}). Try again`, error: true }
    })

    return transaction
}