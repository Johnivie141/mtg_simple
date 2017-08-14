import React, { Component } from 'react';
import {connect} from 'react-redux';
import {newGame} from './../../store/reducer';





class EndGame extends Component{


getWonCard(){

   let card = (this.props && this.props.player && this.props.player.wonCard)?this.props.player.wonCard:null;
     if (!card) card = (this.props && this.props.pc && this.props.pc.wonCard)?this.props.pc.wonCard :null;

    if (card){
        return (       
        <div className="cardDiv">
          <span className="cardSpan">
           <img  className="cardImage" 
           alt={card.name} 
           src={card.imageUrl}
             />
            </span>
            </div>
        
           );
    }
    else return '';


}
 
componentWillUnmount(){
   if (this.props && this.props.newGame){
      this.props.newGame();
   }
      
}

 render(){
     let wonCard = this.getWonCard();
  return (<div className="EndGamePage">
           {wonCard}
          <span className="message">{(this.props.message)?this.props.message:''}</span>
          
          <div>
               <button className="btn btn-primary" 
              onClick={(e)=>this.props.history.push("/")}>
               Play Again</button>
               </div>
         
         
         </div>




       
   );
  }
}

function mapStateToProps(state,ownProps){
   if (ownProps){

    if (ownProps && ownProps.history && !(state && state.history)){
      return Object.assign({},state,{history:ownProps.history});
    }

  }

    return state;
}
export default connect(mapStateToProps,{newGame:newGame})(EndGame);