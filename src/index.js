import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import promise from 'redux-promise';
 
import reducers from './reducers';
import PostsIndex from './components/post_index';
import PostsNew from './components/posts_new';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch> 
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>  
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
  
// in Switch comopnent above takes a collection of routes and looks at 
// first most component that matches the current URL so u want to put 
// your most specific routes first like above