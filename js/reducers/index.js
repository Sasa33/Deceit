import { combineReducers } from 'redux';
import list from './list';
import pods from './pods'
import episodes from './episodes'
import cacheList from './cache'
import navigation from './navigation'

const rootReducer = combineReducers({
    list,
    pods,
    episodes,
    cacheList,
    navigation
});

export default rootReducer;
