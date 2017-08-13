import {Switch, Route} from 'react-router-dom';
import React from 'react';


import Draw from './../components/Draw/Draw';
// Draw Phase will allow you to see your new card in maximum resolution.
// It will automatically pass to the the next phase in 2 seconds.



import Combat from './../components/Combat/Combat'
// Combat Phase Both Your card and Your opponents card are visible
 
 import StartScreen from './../components/StartScreen/StartScreen'
  // Show Play Button.

  import Select from './../components/Select/Select';
// Phase for Selecting Land/Combat creature
// Only Allowed to select one of each
// After a creature is played it goes into the played pile.


export default (
<Switch>

<Route path="/main/combat" component={Combat} />
<Route path="/main/draw" component={Draw} />
<Route path="/main/select" component={Select} />

</Switch>)

