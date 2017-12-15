import _ from 'lodash';

import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case DELETE_POST:
            return _.omit(state, action.payload); // look at the state object, and if it matches the id in deleted post, just omit it from memory to increase UI effecieny 

        case FETCH_POST:
            //    const post = action.payload.data; // our data/posts
            //    const newState = { ...state } // ...state means take all the existing posts that have been fetched and add this new one to this new object we are about to return  
            //    newState[post.id] = post // take the newState object and add an additional property of id and set it to post 
            //    return newState;

            // this is the shortcut to above commented code
            return { ...state, [action.payload.data.id]: action.payload.data };

        case FETCH_POSTS:
            // .mapKeys is a lodash function that converts array to object
            // it takes array as its first argument and the property that we want to pull from the abject in our array to use as a key to represent the resulting object
            return _.mapKeys(action.payload.data, 'id');    

        default:
            return state;
    }
}