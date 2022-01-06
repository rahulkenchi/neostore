import { combineReducers, createStore } from 'redux'

let initialState = 0

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INC': return state + 1;
        case 'DEC': return state - 1;
        default: return state;
    }
}

const rootReducer = combineReducers({ cartReducer });
const store = createStore(rootReducer)

export default store;