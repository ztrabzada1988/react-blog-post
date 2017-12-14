
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import _ from 'lodash';

class PostsIndex extends Component {

    // Lifecycle methods are immediately run by react once this component
    // shows up in the DOM which is great to use for times when we call 
    // to fetch data without an event being triggered like the fetching API 
    // data before user opens/changes another page/url - fetching data is asynchronous operation
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}> 
                    {post.title}
                </li>
            );
        });
    }

    render() {
        
        return (
            <div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

//when you want to consume anything from application level state you:
function mapStateToProps(state) {
    return { posts: state.posts };
}

//hook up the action creator to our component
export default connect(mapStateToProps, { fetchPosts })(PostsIndex); //instead of using mapDistpatchToProps we pass the action create directly to connect