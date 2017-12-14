import { combineReducers } from 'redux';

import PostsReducer from './reducer_posts';
import { reducer as formReducer } from 'redux-form'; // as means rename reducer to formReducer

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer // make sure keyword for formReducer is always form
});

export default rootReducer;
