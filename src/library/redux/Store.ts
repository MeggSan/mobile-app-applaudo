import {createStore, combineReducers} from 'redux';

// REDUCERS
import {favoritesReducer} from './reducers/FavoritesReducer';

const reducers = combineReducers({
  favoritesReducer,
});

export default store = createStore(reducers);
