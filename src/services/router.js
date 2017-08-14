import {Switch, Route} from 'react-router-dom';
import React from 'react';


import Login from './../components/Login/Login'

import Main from './../components/Main/Main';
// Main Phase will show your list of cards
// it will allow you to see Life status for you and your opponent.
// This is the main screen with all the phase components


 import Land from './../components/Land/Land';
  // The Land component will display currently usable land

  import About from './../components/About/About'
  // This About component will merey give information about this game

  import Settings from './../components/Settings/Settings';
  import EndGame from './../components/EndGame/EndGame';

export default (
<Switch>

<Route exact path="/" component={Main} />
<Route path="/land" component={Land} />
<Route exact path="/home" component={Main} />
<Route path="/about" component={About} />
<Route path="/settings" component={Settings} />
<Route path="/login" component={Login} />
<Route path="/endgame" component={EndGame} />
<Route  path="/" component={Main} />
</Switch>);

