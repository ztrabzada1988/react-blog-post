
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom' // like anchor tag in html <a href=""></a> but unlike anchor tag it wont make an http request each time you click on it

class PostsIndex extends Component {

    // Lifecycle methods are immediately run by react once this component
    // shows up in the DOM which is great to use for times when we call 
    // to fetch data without an event being triggered like the fetching API 
    // data before user opens/changes another page/url - fetching data is asynchronous operation
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, post => { // props here is an object incoming from reducer_posts so .map alone wont work since it is not an array so we need to use lodash's .map function 
            return (
                <li className="list-group-item" key={post.id}> 
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
                    </Link>    
                </li>
            );
        });
    }

    render() {
        
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
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