
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
// Field knows how to handle all event handlers, actions creators and etc

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    renderField(field) { // must be wired up to Field to make sure Field knows its responsible for this field represents a single piece of state
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
        
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text" 
                    {...field.input} // ... makes all the functionality of field object availabe to input like onChange and etc
                />
                <div className="text-help">
                    {field.meta.touched ? field.meta.error : ''} 
                </div>
            </div>
        ); // touched above means if user touches/clicks/makes changes to in the input then display error 
    }

    onSubmit(values) {
        
        this.props.createPost(values, () => { // this callback function says wait untill the post is created then go to home page e.g post .then => .....
            this.props.history.push('/'); 
        });
    }

    render() {
        const { handleSubmit } = this.props; // handleSubmit comes a props from reduxForm

        return (
            // here handleSubmit is run first to handle all the events from redux form and if successful then we run the callback function inside (dont forget to bind this)
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title"
                    name="title" // what piece of state is the user editing. name must match errors names in validate in the bottom
                    component={this.renderField} // function that must return some JSX
                />
                <Field 
                    label="Catagories"
                    name="catagories" // what piece of state is the user editing
                    component={this.renderField} // function that must return some JSX
                />
                <Field 
                    label="Post Content"
                    name="content" // what piece of state is the user editing
                    component={this.renderField} // function that must return some JSX
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>      
        );
    }
}

function validate(values) {
    // console.log(values) -> { title: 'adadd', catagories: 'asdjfa' content: 'asdfadsf' }
    const errors = {};

    // Validate the inpurt from 'values'
    if (!values.title) { // values.title must match the name above 'title
        errors.title = "Enter a title!"; 
    }

    if (!values.catagories) {
        errors.catagories = "Enter some catagories!";
    }
    
    if (!values.content) {
        errors.content = "Enter some content!";
    }

    // if errors is empty at the end, the form is fine to submit
    // but if errors has any properties, redux form asummes form is invalid
    return errors;
}

export default reduxForm({ // just like connect 
    validate,
    form: 'PostsNewForm' // make sure this string is unique 
})(
    connect(null, { createPost })(PostsNew)  // this is how we do two style function connect and reduxForm
);