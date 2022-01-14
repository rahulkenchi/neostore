import { combineReducers, createStore } from 'redux'

let initialState = 1

export const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'INC': if (localStorage.getItem('cart') != undefined) {
            return JSON.parse(localStorage.getItem('cart')).length
        }
        case 'DEC': if (localStorage.getItem('cart') != undefined) {
            return JSON.parse(localStorage.getItem('cart')).length
        }
        default: return state;
    }
}

const rootReducer = combineReducers({ cartReducer });
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;