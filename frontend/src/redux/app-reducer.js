const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_IS_INITIALIZED = "SET_IS_INITIALIZED"

const initialState = {
    isInitialized: false,
    isFetching: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
const setIsInitialized = (isInitialized) => ({type: SET_IS_INITIALIZED, isInitialized})

export const initializeApp = () => async (dispatch) => {
    try {
    } catch (e) {
        alert("an error occurred during app initialization")
    }
}
