import { RootState } from '../models';
import { AnyAction, Reducer } from 'redux';

const global: Reducer = (state = {test: 'test'}, action: AnyAction) => {
    switch (action.type) {
        default:
        return state
    }
}
  
  export default global