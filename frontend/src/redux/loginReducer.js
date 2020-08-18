const SET_NAME = "SET_NAME"
const SET_ROOM = "SET_ROOM"

const initialState = {
    name: '',
    room: ''
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAME:
            return {...state, name: action.name}
        case SET_ROOM:
            return {...state, room: action.room}
        default:
            return state
    }
}

export const setNameAction = (name) => ({type: SET_NAME, name})
export const setRoomAction = (room) => ({type: SET_ROOM, room})
