import React, { Component } from 'react';
import {connect} from 'react-redux'
import './Draw.css';
import {setVoice,pickCard,newGame} from '../../store/reducer';
import {postCombat} from './../../store/reducer'
 class Draw extends Component{


winLoseCheck(){

  // check for Victory
  
   if (this.props && this.props.endGame){   
       this.props.history.push("/endgame");
     }
   
}

componentWillMount(){ 

 if (this.props && this.props.pickCard){
  
   this.props.pickCard();
   
    this.winLoseCheck();

	
if (this.props && this.props.message && this.props.pc.voice){
	this.activateVoice(this.props.message);
}


 }
    
}




componentWillReceiveProps(){
  this.winLoseCheck();

	 console.log("voice check1");
	 console.log(this.props);
          if (this.props && this.props.setVoice){

		  console.log("start voice");
	   window.speechSynthesis.onvoiceschanged=function(){
		  
	      let voices=window.speechSynthesis.getVoices();
	      let myvoice = voices.filter(function(voice) { return voice.name == 'Google русский'; })[0];

		   console.log("SET VOICE");
		  this.props.setVoice(myvoice);

	   }.bind(this);
	  }

}

activateVoice(message){
	console.log("activate voice");
 if (this.props && this.props.pc && this.props.pc.voice && message){
    let utterance = new SpeechSynthesisUtterance(message);
    utterance.voice = this.props.pc.voice;
    window.speechSynthesis.speak(utterance);
 }


}
 render(){
   
  return (<div className="drawPhase">
    <div className="cardDiv">
       <span className="cardSpan">
           <img  className="cardImage" 
           alt={(this.props.player && this.props.player.newCard)?this.props.player.newCard.name:""} 
           src={(this.props.player && this.props.player.newCard)?this.props.player.newCard.imageUrl:""}
             />
            </span>
            </div>
            <div>
          <span className="message">{(this.props.message)?this.props.message:''}</span>
         </div>

       </div>
   );
  }
}


function mapStateToProps(state,ownProps)
{
  if (ownProps){

    if (ownProps && ownProps.history && !(state && state.history)){
      return Object.assign({},state,{history:ownProps.history});
    }

  }

    return state;
}
export default connect(mapStateToProps,{setVoice:setVoice,postCombat:postCombat,pickCard:pickCard,newGame:newGame})(Draw);
