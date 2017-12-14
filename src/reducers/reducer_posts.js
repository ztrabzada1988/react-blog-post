import _ from 'lodash';

import { FETCH_POSTS } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            // .mapKeys is a lodash function that converts array to object
            // it takes array as its first argument and the property that we want to pull from the abject in our array to use as a key to represent the resulting object
            return _.mapKeys(action.payload.data, 'id');    
        default:
            return state;
    }
}