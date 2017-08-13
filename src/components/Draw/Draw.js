import React, { Component } from 'react';
import {connect} from 'react-redux'
import './Draw.css';
import {pickCard,newGame} from '../../store/reducer';
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
 }
    
}
componentWillReceiveProps(){
  this.winLoseCheck();
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
export default connect(mapStateToProps,{postCombat:postCombat,pickCard:pickCard,newGame:newGame})(Draw);