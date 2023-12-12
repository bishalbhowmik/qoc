import { AUTHENTICATED } from "./ActionTypes"

const initialState = {
    decodedToken: {},
    authenticated: false,
}

const reducer = (state = initialState, action) => {

    if (action.type === AUTHENTICATED) {
        return {
            ...state,
            authenticated: action.authenticated,
            decodedToken: action.decodedToken
        }
    }



    return state
}



export default reducer