import React from 'react'
import { useState,useEffect,useRef } from 'react'
import openai from 'openai'
import './Chat.css';
import { api } from './api';
import noteContext from '../context/noteContext';
import { useContext } from 'react';
import Noteitem from './NoteItem';

// const chatBubbleImage = require('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz9dpAy5BXPrdHlAkKh4QLPQ5wQZFZ86g4YKk17jU&s');

export const PreviousChat = () => {
  const context = useContext(noteContext)
  
  const { notes,addNote,deleteNote,getNotes,api } = context;
  useEffect(() => {
    console.log(localStorage.getItem('token'))
    getNotes()
    // eslint-disable-next-line
  
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
  
  
  
  
  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  
  
  
  return (
    <div className="row-3">
      <div className="PreviousChat">
        <h2>Previous Responses</h2>
        <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz9dpAy5BXPrdHlAkKh4QLPQ5wQZFZ86g4YKk17jU&s'} alt="Chat bubble" />
        <div className="container mx-2">
          {notes.length === 0 && 'No notes to display'}
          {notes.map((note) => {
            return <Noteitem key={note._id} deleteNode={deleteNote} note={note} />;
          })}
        </div>
      </div>
    </div>
  );
};
