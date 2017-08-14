
import React, { Component } from 'react';

import {connect} from 'react-redux'
import {changeSetting} from './../../store/reducer'
import './Settings.css';


 class Settings extends Component{


 render(){
  return (<div className="settingsDiv">

      <div className="settingDiv">
     
       <div className="sub">
         <label  htmlFor="preLandCount">Amount of Land to Start with</label>
       </div>
       <div className="sub">
         <input className="input" ref="preLandCount" type="text" pattern="[0-9]*" />
      </div>
      <div className="sub">
         <button className="btn btn-primary" onClick={(e)=>this.props.changeSetting("preLandCount",this.refs.preLandCount.value)}>
          Set
         </button>
       </div>   
      </div>



      <div className="settingDiv">
     
       <div className="sub">
         <label  htmlFor="handSize">Number of cards in initial hand</label>
       </div>
      
     <div className="sub">
         <input className="input" ref="handSize" type="text" pattern="[0-9]*" />
      </div>
      <div className="sub">
         <button className="btn btn-primary" onClick={(e)=>this.props.changeSetting("handSize",this.refs.handSize.value)}>
          Set
         </button>
       </div>   
      </div>





      <div className="settingDiv">
     
       <div className="sub">
         <label  htmlFor="playerLifePoints">Starting player life points</label>
       </div>
       <div className="sub">
         <input className="input" ref="playerLifePoints" type="text" pattern="[0-9]*" />
      </div>
      <div className="sub">
         <button className="btn btn-primary" onClick={(e)=>this.props.changeSetting("playerLifePoints",this.refs.playerLifePoints.value)}>
          Set
         </button>
       </div>   
      </div>
      


<div className="settingDiv">
     
       <div className="sub">
         <label  htmlFor="pcLifePoints">Starting computer life points</label>
       </div>
       <div className="sub">
         <input className="input" ref="pcLifePoints" type="text" pattern="[0-9]*" />
      </div>
      <div className="sub">
         <button className="btn btn-primary" onClick={(e)=>this.props.changeSetting("pcLifePoints",this.refs.pcLifePoints.value)}>
          Set
         </button>
       </div>   
      </div>

     <div className="settingDiv">
     
       <div className="sub">
         <label  htmlFor="computerName">Change name of computer opponent</label>
       </div>
      
     <div className="sub">
         <input className="input" ref="computerName" type="text"  />
      </div>
      <div className="sub">
         <button className="btn btn-primary" onClick={(e)=>this.props.changeSetting("computerName",this.refs.computerName.value)}>
          Set
         </button>
       </div>   
      </div>


 <div className="settingDiv">
     
       <div className="sub">
         <label  htmlFor="computerCanPlayLand">Allow the computer to play land cards</label>
       </div>
      
     <div className="sub">

         <select ref="computerCanPlayLand" name="computerCanPlayLand">
           <option value="true">true</option>
           <option value="false">false</option>
         </select>
      </div>
      <div className="sub">
         <button className="btn btn-primary" onClick={(e)=>this.props.changeSetting("computerCanPlayLand",this.refs.computerCanPlayLand.value)}>
          Set
         </button>
       </div>   
      </div>



      

  
           
       

      
       </div>
   );
  }
}

function mapStateToProps(state){

console.log(state); 
    return state;


}

export default connect(mapStateToProps,{changeSetting:changeSetting})(Settings)