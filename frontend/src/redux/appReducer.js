const SET_IS_FETCHING = "SET_IS_FETCHING"

const initialState = {
    isFetching: false
}

export const appReducer = (state = initialState, action) => {
    if (action.type === SET_IS_FETCHING) {
        return {...state, isFetching: action.isFetching}
    } else return state
}

export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
