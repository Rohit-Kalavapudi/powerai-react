import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {  Routes, Route } from 'react-router-dom';
import { Chat } from './components/Chat';
import { Audio } from './components/Audio';
import Login from './components/login';
import { Logout } from './components/Logout';
import Noteitem from './components/NoteItem';
import { PdfSummarizer } from './components/PdfSummarizer';
import { PreviousChat } from './components/PreviousChat';
import Signup from './components/Signup';
import { NoteState } from './context/NoteState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <NoteState>
      <App />
    </NoteState>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
