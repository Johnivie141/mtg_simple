import React, { Component } from 'react';
import {connect} from 'react-redux'
import './StartScreen.css';
import {getSetting} from './../../store/reducer';
export class StartScreen extends Component{

componentDidMount(){
  
}

 render(){
  return (<div className="startScreenPage">
       <div className="container">
         <div className="jumbotron">
           <h1>Magic the Gathering: Simple</h1> 
           <p>Welcome to the arena{(this.props &&this.props.player && this.props.player.name)?" "+this.props.player.name : ''}.</p> 
           <p>Summon creatures to defeat your foe.</p>
           <p>Victory will gain you power and fame.</p>
           <p>Current Version: 0.5</p>
           

    </div>
    </div>

       </div>
   );
  }
}
function mapStateToProps(state)
{

    return state;
}
export default connect(mapStateToProps,{getSetting:getSetting})(StartScreen);