import { combineReducers } from 'redux';
import list from './list';
import pods from './pods'
import episodes from './episodes'
import cacheList from './cache'

const rootReducer = combineReducers({
    list,
    pods,
    episodes,
    cacheList
});

export default rootReducer;
