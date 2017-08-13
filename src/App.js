import React, { Component } from 'react';

import './App.css';
import router from './services/router.js'



import Nav from './components/Nav/Nav';
// this is the Header Navigation bar.
// We will be able to Route to
// Home - current Phase 
// Land - Show all the available land cards played (both you and opponent)
// About - Short description and some instructions.
// Deck - Show Won/Lost Cards. -Maybe Not?





class App extends Component {
  render() {

    return (
      <div className="App">
        <Nav/>
        {router}
      </div>
    );
  }
}

export default App;
