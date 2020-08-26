const SET_MESSAGE = "SET_MESSAGE"
const SET_MESSAGES = "SET_MESSAGES"

const initialState = {
    messages: [],
    message: ''
}

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return {...state, message: action.message}
        case SET_MESSAGES:
            return {...state, messages: [...state.messages, action.message]}
        default:
            return state
    }
}

export const setMessageAction = (message) => ({type: SET_MESSAGE, message})
export const setMessagesAction = (message) => ({type: SET_MESSAGES, message})
