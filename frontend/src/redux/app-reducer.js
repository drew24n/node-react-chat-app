const SET_IS_FETCHING = "SET_IS_FETCHING"

const initialState = {
    isFetching: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

export const setIsFetchingAction = (isFetching) => ({type: SET_IS_FETCHING, isFetching})

export const setIsFetching = () => async (dispatch) => {
    try {
        dispatch(setIsFetchingAction(true))
    } catch (e) {
        alert(e)
    } finally {
        dispatch(setIsFetchingAction(false))
    }
}
