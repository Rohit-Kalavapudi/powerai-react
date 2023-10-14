import React from 'react'
import { useState,useEffect,useRef } from 'react'
import openai from 'openai'
import './Chat.css';
import { api } from './api';
import noteContext from '../context/noteContext';
import { useContext } from 'react';
import Noteitem from './NoteItem';
import { PreviousChat } from './PreviousChat';
import Login from './login';
import { Logout } from './Logout';
import Signup from './Signup'
const Chat = () => {

    const context = useContext(noteContext)
    
    const { notes,addNote,deleteNote,getNotes,api } = context;
    const api1=api;
    const [request, setRequest] = useState("")
    const [response,setResponse]= useState("")
    

    const sendRequest=async(e)=>{
        e.preventDefault();
        const data = await api1(request)
        // const data =await response.json();
        console.log(data.bot)
        setResponse(data.bot)
        document.getElementsByClassName('h1').innerHTML=data.bot;
   
        
    }
  return (
    
    <>
    <div className="container1">
      <div className="chat-container">
      <h1>Power AI</h1>
      <form onSubmit={sendRequest} className="input-form">
        <input
          type="text"
          onChange={(e) => setRequest(e.target.value)}
          placeholder="Ask a question..."
        />
        <button type="submit">Submit</button>
      </form>

      
      {response && (
        <div className="response-container">
          <p className="response">{response}</p>
        </div>
      )}
      
    </div>
    <PreviousChat/>
    </div>
    </>
  )
}

export default Chat
