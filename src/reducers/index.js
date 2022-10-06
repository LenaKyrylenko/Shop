import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { actionAuthLogin } from '../actions'
function promiseReducer(state = {}, { type, name, status, payload, error }) {
    if (type === 'PROMISE') {
      return {
        ...state,
        [name]: { status, payload, error },
      }
    }
    return state
  }
  
const jwtDecode = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }
  function authReducer(state, { type, token }) {
    if (state === undefined && localStorage.authToken) {
      token = localStorage.authToken
      type = 'AUTH_LOGIN'
    }
    if (type === 'AUTH_LOGIN') {
      if (jwtDecode(token)) {
        localStorage.authToken = token
        return { token, payload: jwtDecode(token) }
      }
    }
    if (type === 'AUTH_LOGOUT') {
      localStorage.authToken = ''
      return {}
    }
    return state || {}
  }
  
  function cartReducer(state = {}, { type, good = {}, count = 1 }) {
    //каков state:
    //{
    //  _id1: {count:1, good: {_id1, name, price, images}}
    //  _id2: {count:1, good: {_id2, name, price, images}}
    //}
    //каковы действия по изменению state
    if (type === 'CART_ADD') {
      count = +count
      if (!count) return state
      else
        return {
          ...state,
          [good._id]: { good, count: count + (state[good._id]?.count || 0) },
          //копируем старое и подменяем один ключ на новое, однако если
          //ключ был, берем count из старого и прибавляем к count из action.
        }
    }
    if (type === 'CART_CHANGE') {
      count = +count
      if (!count) return state
  
      return {
        ...state,
        [good._id]: { good, count },
      }
    }
    if (type === 'CART_DELETE') {
      const { [good._id]: removedProperty, ...someGoods } = state
      return someGoods
    }
  
    if (type === 'CART_CLEAR') {
      return {}
    }
    return state
  }
 export const store = createStore(
    combineReducers({
      promise: promiseReducer,
      auth: authReducer,
      cart: cartReducer,
    }),
    applyMiddleware(thunk),
  )