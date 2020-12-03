import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer, { initialState } from './reducers'

export const initStore = (state = initialState) => {
    return createStore(rootReducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}