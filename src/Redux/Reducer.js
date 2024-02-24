import { AUTHENTICATED } from "./ActionTypes"

const initialState = {
    decodedToken: {},
    authenticated: false,
    conversation: []
}

const reducer = (state = initialState, action) => {

    if (action.type === AUTHENTICATED) {
        return {
            ...state,
            authenticated: action.authenticated,
            decodedToken: action.decodedToken
        }
    }

    if (action.type === 'ADD_MESSAGE') {
        return {
            ...state,
            conversation: [...state.conversation, action.payload]
        }
    }

    return state
}



export default reducer