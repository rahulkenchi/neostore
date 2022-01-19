import { combineReducers, createStore } from 'redux'

export const userReducer = (state = sessionStorage.getItem('_token') != undefined ? true : false, action) => {
    switch (action.type) {
        case 'isLogin': return sessionStorage.getItem('_token') != undefined ? true : false;
        default: return false;
    }
}

let initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0
export const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'INC': return state = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0
        case 'DEC': return state = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0
        default: return state;
    }
}

const rootReducer = combineReducers({ cartReducer, userReducer });
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;