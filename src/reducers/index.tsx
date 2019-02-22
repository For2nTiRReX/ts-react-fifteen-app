import { combineReducers } from 'redux'
import authentication from './authentication-reducer'
import global from './authentication-reducer'

export default combineReducers({
  authentication,
  global
})

