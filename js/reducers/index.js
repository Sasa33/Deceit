import { combineReducers } from 'redux';
import list from './list';
import pods from './pods'
import episodes from './episodes'

const rootReducer = combineReducers({
    list,
    pods,
    episodes
});

export default rootReducer;
