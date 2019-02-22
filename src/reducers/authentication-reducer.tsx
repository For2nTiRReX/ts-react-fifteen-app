import { RootState } from '../models';
import { Reducer, AnyAction } from 'redux';

const authentication: Reducer = ( state: RootState = {player: null, isAuthenticated: false}, action: AnyAction ) => {
    switch (action.type) {
       case 'USER_LOGGED_IN':
        return {
          ...state,
          player: action.player,
          isAuthenticated: true
        }
      // case 'ADD_TODO':
      //   return [
      //     ...state,
      //     {
      //       id: action.id,
      //       text: action.text,
      //       completed: false
      //     }
      //   ]
      // case 'TOGGLE_TODO':
      //   return state.map(todo =>
      //     (todo.id === action.id)
      //       ? {...todo, completed: !todo.completed}
      //       : todo
      //   )
      default:
        return state
    }
  }
  
  export default authentication