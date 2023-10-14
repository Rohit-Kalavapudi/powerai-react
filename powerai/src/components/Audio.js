import React from 'react'
import { useState } from 'react'
import {sendRequest} from './Query'
import openai from 'openai'
import './Chat.css';
import { api } from './api';


export const Audio = () => {
  var [pdf,setPdf] = useState(null);
  var [content,setContent] = useState()
  const [request, setRequest] = useState("Summarize this text after correcting it (there are some spelling mistakes): ")
    const [response,setResponse]= useState("")


  const handleSubmit=async(event)=>{
      event.preventDefault();
      const file = pdf;
  const formData = new FormData();
  formData.append('audio', file);

  // try {
    const response = await fetch('http://127.0.0.1:5000/audio', {
      method: 'POST',
      body: formData,
    });
    const resp=await response.json()
    setContent(resp)
    const output=await sendRequest(resp)

  
  }

  const sendRequest=async(req)=>{
    
    setRequest(req)
    const response1 = await api(req)
    console.log(req)
    const data =await response1.json();
    console.log(data.bot)
    // console.log(data.bot)
    setResponse(data.bot)
    console.log(response)
    return response;

    
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e)=>setPdf(e.target.files[0])}/>
        <button type="submit">Submit</button>
      </form>
      {content && (
        <div className="response-container">
          <p className="response">{response}</p>
        </div>
      )}
    </>
  )
}
