import {Actions} from "../actions/actions";

const initialState = {
    userData: {},
}

const GeneralReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case Actions.setUserData:
            return {...state, userData: payload}
        default:
            return state
    }
}

export default GeneralReducer
