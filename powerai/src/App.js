import Chat  from './components/Chat';
import './App.css';
import { PdfSummarizer } from './components/PdfSummarizer';
import { Audio } from './components/Audio';
import {NoteState} from './context/NoteState';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import { Logout } from './components/Logout';
import Noteitem from './components/NoteItem';
import { api } from './components/api';
import Footer from './components/Footer';
import AudioChat from './components/AudioChat';

import { PreviousChat } from './components/PreviousChat';
import Signup from './components/Signup';
import Grid from './components/grid'
import styled from 'styled-components';
import { useEffect, useState } from 'react';
function App() {
  const NavbarContainer = styled.div`
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  
`;

const NavItem = styled.a`
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
const WebsiteName = styled.span`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  cursor: default;
`;
  const [name, setName] = useState("Anonymous")
  useEffect(() => {
    setName((prevState) => {
      const newname = localStorage.getItem('name');
      return newname || prevState;
    });
  });
  
  return (
    <>
    <div style={{ minHeight: '94vh'}}>
      <NavbarContainer >
      <WebsiteName href="/">POWERAI</WebsiteName>
      <NavItem href="/">Home</NavItem>
      <NavItem href="/chat">Chat</NavItem>
      {name === "Anonymous" ? (
          <NavItem href="/login">Login</NavItem>
        ) : (
          <NavItem href="/logout">Logout</NavItem>
        )}
      <NavItem>Hello, {name}</NavItem>
      

    </NavbarContainer>
    <br/>
    <br/><br/>
      <Routes>
      <Route path="/" element={<Grid/>} />
        <Route exact path="/chat" element={<Chat/>} />
        <Route path="/audio" element={<Audio/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/noteitem" element={<Noteitem/>} />
        <Route path="/pdfsummarizer" element={<PdfSummarizer/>} />
        <Route path="/previouschat" element={<PreviousChat/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/audiochat" element={<AudioChat/>}/>
      </Routes>
      </div>
      <Footer/>
      
    </>
  );
}

export default App;
