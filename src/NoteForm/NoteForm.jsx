import React, { Component } from 'react';
import './NoteForm.css';

class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newfriend: '',
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote.bind(this);
    }

    // When the user input changes, set the newfriend
    // to the value of what's in the input box.
    handleUserInput(e) {
        this.setState({
            newfriend: e.target.value, // the value of the text input
        })
    }

    writeNote() {
        // call a method that sets the friend for a note to
        // the value of the input
        this.props.addFriend(this.state.newfriend);

        // Set newfriend back to an empty string.
        this.setState({
            newfriend: '',
        })
    }

    render() {
        return (
            <div className="formWrapper">
                <input className="noteInput"
                    placeholder=""
                    value={this.state.newfriend}
                    onChange={this.handleUserInput} />
                <button className="noteButton"
                    onClick={this.writeNote}>Add Friend</button>
            </div>
        )
    }
}

export default NoteForm;