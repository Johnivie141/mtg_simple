import React, { Component } from 'react';
import {connect} from 'react-redux'
import {newCreature,nextCard,newLand} from './../../store/reducer';

import './Select.css';
import {canSelectCreature}  from './../../utils/utils';







export class Select extends Component{


selectPlayerCard(event,index){
// this function will select the player Card

 if (index > this.props.player.hand.length -1 || index <0 )return ;
 
 let card = this.props.player.hand[this.props.player.selectedPosition];
 // Check logic to see if this is a valid card to select

   if (card.types[0] ==='Land'){
       if (this.props.player.newLand ===null)
        this.props.newLand(this.props.player.selectedPosition);
       else{
           alert('You already chose a Land');
       }

    }

    
    if (card.types.indexOf('Creature')!==-1){
      //manaCost {3}{G}{G}"
   
           
      // if cardFailure is true we can't play this card 
      // otherwise play
      if (canSelectCreature(card,this.props.player.land)){
          if(this.props.player.combatCreature ===null){
              this.props.newCreature(this.props.player.selectedPosition);
          }
          else{
              
              alert('You already played a creature');
          }
      }
     



    }
}

 render(){
    

let playerHand='';

   if (this.props && this.props.player && this.props.player.hand){

     let position = this.props.player.selectedPosition || 0;
      if (position > this.props.player.hand.length -1) position = this.props.player.hand.length -1;
      if (position <0) position =0;
    
   playerHand= this.props.player.hand.map((card,index)=>{
   
     if ((index ===position%this.props.player.hand.length)
     
       ){
      
           
         return ( <span className="cardSpan" onClick={(e)=>{this.selectPlayerCard(e,index)}} key={index}><img  className="cardImage" alt={card?card.name:""} src={card?card.imageUrl:''}  /></span>);
   
       }  
       else return '';  
   });
   }







  return (
  <div className="selectPhase">

      <div></div>
      <div className="selectCardDiv">
      <span onClick={(e)=>this.props.nextCard(-1)} className="nextPrevious">&#8249;</span> {playerHand}<span  onClick={(e)=>this.props.nextCard(1)} className="nextPrevious">&#8250;</span>
       </div>
       </div>
 
    
   );
  }
}
function mapStateToProps(state)
{


    return state;
}
export default connect(mapStateToProps,{newCreature:newCreature,newLand:newLand,nextCard:nextCard})(Select);
