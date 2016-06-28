import { combineReducers } from 'redux';
import pods from './pods'
import episodes from './episodes'
import cacheList from './cache'
import navigation from './navigation'

const rootReducer = combineReducers({
    pods,
    episodes,
    cacheList,
    navigation
});

export default rootReducer;
