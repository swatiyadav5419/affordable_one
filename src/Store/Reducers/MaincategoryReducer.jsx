import { ADD_MAINCATEGORY_RED, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY_RED } from "../Constants"
export default function MaincategoryReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case GET_MAINCATEGORY_RED:
            return action.payload
        case ADD_MAINCATEGORY_RED:
            newState = state
            newState.push(action.payload)
            return newState
        case UPDATE_MAINCATEGORY_RED:
            index = state.findIndex((x) => x.id === Number(action.payload.id))
            state[index].name = action.payload.name
            return state
        case DELETE_MAINCATEGORY_RED:
            newState = state.filter((x) => x.id !== action.payload.id)
            return newState
        default:
            return state
    }
}
