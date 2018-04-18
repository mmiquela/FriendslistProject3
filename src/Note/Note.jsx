import React, { Component } from 'react';
import './Note.css';
import PropTypes from 'prop-types';

class Note extends Component {

    constructor(props) {
        super(props);
        this.friend = props.friend;
        this.noteId = props.noteId;
        this.handleremoveFriend = this.handleremoveFriend.bind(this);
    }

    handleremoveFriend(id) {
        this.props.removeFriend(id);
    }

    render() {
        return (
            <div className="note fade-in">
                <span className="closebtn"
                    onClick={() => this.handleremoveFriend(this.noteId)}>
                    &times;
                </span>
                <p className="friend">{this.friend}</p>
            </div>
        )
    }
}

Note.propTypes = {
    friend: PropTypes.string
}

export default Note;