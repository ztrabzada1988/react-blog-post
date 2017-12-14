
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
// Field knows how to handle all event handlers, actions creators and etc

class PostsNew extends Component {

    renderField(field) { // must be wired up to Field to make sure Field knows its responsible for this
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text" 
                    {...field.input} // ... makes all the functionality of field object availabe to input like onChange and etc
                />
            </div>
        );
    }

    render() {
        return (
            <form>
                <Field 
                    label="Title"
                    name="title" // what piece of state is the user editing
                    component={this.renderField} // function that must return some JSX
                />
                <Field 
                    label="Tags"
                    name="tags" // what piece of state is the user editing
                    component={this.renderField} // function that must return some JSX
                />
                <Field 
                    label="Post Content"
                    name="content" // what piece of state is the user editing
                    component={this.renderField} // function that must return some JSX
                />
            </form>      
        );
    }
}

export default reduxForm({ // just like connect 
    form: 'PostsNewForm' // make sure this string is unique 
})(PostsNew);