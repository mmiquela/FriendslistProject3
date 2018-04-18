import React, { Component } from 'react';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.addFriend = this.addFriend.bind(this);
    this.removeFriend = this.removeFriend.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('users/ZJ4QzEwBiygNIGwbv5zfefDovpJ3/FriendsList');

    // this.database = this.app.database().ref().child('cards');

    // We're going to setup the React state of our component
    this.state = {
      notes: [],
    }
  }

  componentWillMount(){
    const previousFriends = this.state.notes;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousFriends.push({
        id: snap.key,
        friend: snap.val().friend,
      })

      this.setState({
        notes: previousFriends
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousFriends.length; i++){
        if(previousFriends[i].id === snap.key){
          previousFriends.splice(i, 1);
        }
      }

      this.setState({
        notes: previousFriends
      })
    })
  }

  addFriend(note){
    this.database.push().set({ friend: note});
  }

  removeFriend(noteId){
    console.log("from the parent: " + noteId);
    this.database.child(noteId).remove();
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">Friends List</div>
        </div>
        <div className="notesBody">
          {
            this.state.notes.map((note) => {
              return (
                <Note friend={note.friend} 
                noteId={note.id} 
                key={note.id} 
                removeFriend ={this.removeFriend}/>
              )
            })
          }
        </div>
        <div className="notesFooter">
          <NoteForm addFriend={this.addFriend} />
        </div>
      </div>
    );
  }
}

export default App;