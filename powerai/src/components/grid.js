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
import './grid.css'
import AudioChat from './AudioChat';

import styled from 'styled-components';


const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
  padding: 20px;
  text-align: center;
`;

const CardIcon = styled.img`
  width: 80px;
  height: 80px;
  margin: 0 auto 15px;
`;

const CardTitle = styled.h2`
  font-size: 20px;
  margin: 0;
  color: #333;
`;

const CardText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
`;

const CardLink = styled.a`
  display: inline-block;
  background-color: #007BFF;
  color: #fff;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Grid = () => {
  return (
    <>
    <center>
    <h2>TRY OUR WIDE RANGE OF FUNCTIONS</h2>
    </center>
    <br/>
    <br/>
    <CardContainer>
      <Card>
        <CardIcon src="https://static.cdnlogo.com/logos/c/18/ChatGPT_350x350.png" alt="Chat Icon" />
        <CardTitle>Chat window</CardTitle>
        <CardText>Click to open the ChatGPT interface and start chatting.</CardText>
        <CardLink href="/Chat">Open Chat</CardLink>
      </Card>
      
      <Card>
        <CardIcon src="https://is2-ssl.mzstatic.com/image/thumb/Purple116/v4/87/17/c7/8717c7af-f2fb-e63a-f0ae-a0ea82d3e60a/AppIcon-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg" alt="PDF Icon" />
        <CardTitle>PdfSummarizer</CardTitle>
        <CardText>Summarize your PDF documents easily with PdfSummarizer.</CardText>
        <CardLink href="/PdfSummarizer">Summarize PDF</CardLink>
      </Card>
      {/* <Card>
        <CardIcon src="data:image/png;base64,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" alt="Audio Icon" />
        <CardTitle>AudioSummarizer</CardTitle>
        <CardText>Summarize your audio files quickly with AudioSummarizer.</CardText>
        <CardLink href="/Audio">Summarize Audio</CardLink>
      </Card> */}
      <Card>
        <CardIcon src="data:image/png;base64,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" alt="Previous Chat Icon" />
        <CardTitle>Previous chat</CardTitle>
        <CardText>Access your previous chat history with PreviousChat.</CardText>
        <CardLink href="/PreviousChat">View Chat History</CardLink>
      </Card>
      <Card>
        <CardIcon src="https://news.mit.edu/sites/default/files/download/201702/mit-speech-rec-press.jpg" />
        <CardTitle>Audio chat</CardTitle>
        <CardText>Use ChatGPT voice to text</CardText>
        <CardLink href="/audiochat">Voice to Text</CardLink>
      </Card>
    </CardContainer>
    </>
  );
};

export default Grid;
