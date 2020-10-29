const SET_MESSAGE = "SET_MESSAGE"
const SET_MESSAGES = "SET_MESSAGES"
const SET_ONLINE_USERS = "SET_ONLINE_USERS"

const initialState = {
    messages: [],
    message: '',
    onlineUsers: []
}

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return {...state, message: action.message}
        case SET_MESSAGES:
            return {...state, messages: [...state.messages, action.message]}
        case SET_ONLINE_USERS:
            return {...state, onlineUsers: [...action.users]}
        default:
            return state
    }
}

export const setMessageAction = (message) => ({type: SET_MESSAGE, message})
export const setMessagesAction = (message) => ({type: SET_MESSAGES, message})
export const setOnlineUsers = (users) => ({type: SET_ONLINE_USERS, users})
