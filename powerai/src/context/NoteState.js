import NoteContext from './noteContext'
import { useState } from 'react'
import Chat from '../components/Chat';
import { PdfSummarizer } from '../components/PdfSummarizer';
import { Audio } from '../components/Audio';
import { PreviousChat } from '../components/PreviousChat';
import Signup from '../components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/login';
import { Logout } from '../components/Logout';
import Noteitem from '../components/NoteItem';
import { api } from '../components/api';


export const NoteState = ({children}) =>{
    const host = "http://localhost:4000"
    const notesInitial = []
    if(localStorage.getItem('token')==null)
    {
      localStorage.setItem('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhMTIyOWM3NTYwM2I5MTEzYzBmM2JiIn0sImlhdCI6MTY4ODI5OTkwMn0.ftUw39tjZJe3sjIpmnZ3ORzPDNUmmMVMA7SkQFJzwI0");
      localStorage.setItem('name','Anonymous')

    }
    console.log(localStorage.getItem('token'))
    const [notes,setNotes] = useState(notesInitial)

    const getNotes = async() =>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',  
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
            }
          });
          const json = await response.json() 
          setNotes(json)
    }

    const addNote = async(title,description) =>{
      console.log(title+" "+description)
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description})
          });
          console.log("added")
          const note = await response.json();
          setNotes(notes.concat(note))
    }

    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = response.json(); 
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
      }

      const api = async(query)=>{
          const data = await fetch(host,{
              method:'POST',
              headers:{
                  'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    prompt: query
                })
            })
            const resp=await data.json()
            
            addNote(query,resp.bot);
        
        return resp;
    }

      return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,getNotes,api}}>
          {children}
            
        </NoteContext.Provider>
      )
}