import React from "react";
import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TeamderCards from "./TeamderCards";
import SwipeButtons from "./SwipeButtons";
import Chats from "./Chats";
import ChatScreen from "./ChatScreen";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports'
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react'
import Signin from "./Signin";
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import GetUserInfo from './GetUserInfo';
import PutUserInfo from './PutUserInfo';
import Pool from './Pool';
import cognitoUser from './GetToken';
Amplify.configure(awsExports);

Amplify.configure(awsconfig)


function App({ signOut, user }) {
  return (
    <div className="App" >
      <Router>
        <Routes>
          <Route path="/chat/:people" element={<><Header backButton="/chat" /><ChatScreen /></>}>
          </Route>
          <Route path="/chat" element={<><Header backButton="/" /><Chats /></>}>
          </Route>
          <Route path="/" element={<><Header />< TeamderCards /><SwipeButtons /></>}>
          </Route>
          <Route path="/signout" element={<><Header /><Signin /></>}>
          </Route>
          <Route path="/GetUserInfo" element={<><Header /><GetUserInfo /></>}>
          </Route>
          <Route path="/PutUserInfo" element={<><Header /><PutUserInfo /></>}>
          </Route>
          <Route path="/PoolInteraction" element={<><Header /><Pool /></>}>
          </Route>
        </Routes>
        {/* Tinder Cards */}
        {/* Buttons below  */}


        {/* Chat screen */}
        {/* Individual Chat screen */}
      </Router>
    </div >
  );
}

export default withAuthenticator(App);
