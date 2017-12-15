
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';


class PostsShow extends Component {

    componentDidMount() {
        const { id } = this.props.match.params; //this is from react-router. Params object contains all the wild card values in our url so e.g :id in our route
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;

        this.props.deletePost(id, () => {
            this.props.history.push('/'); // once deleted, go back to home
        }); // deletePost is action creator
    }

    render() {
        const { post } = this.props;

        if (!post) { // if post has not been fetched correctly
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link to="/"><button className="btn btn-primary">Home</button></Link>
                <button 
                className="btn btn-danger pull-xs-right"
                onClick={this.onDeleteClick.bind(this)}
                >
                Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Catagories: {post.catagories}</h6>
                <p>{post.content}</p>
            </div>
        );
    };
}

function mapStateToProps({ posts }, ownProps) { // first arg is application state and second by convention is ownProps
    // return the individual post from posts (list of posts) with the matching id
    return { post: posts[ownProps.match.params.id] }; // posts here is the full list of all posts 
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);