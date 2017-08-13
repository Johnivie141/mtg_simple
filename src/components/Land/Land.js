import React, { Component } from 'react';
import {connect} from 'react-redux'
import {nextLandCard} from './../../store/reducer'


import './Land.css';

export class Land extends Component{



 render(){

let landCards='';

   if (this.props && this.props.player && this.props.player.land){

     let position = this.props.player.landSelectedPosition || 0;
     if (position > this.props.player.land.length -1) position = this.props.player.land.length -1;
     if (position <0) position =0;
   landCards= this.props.player.land.map((card,index)=>{
   
     if ((index ===position%this.props.player.land.length)
     
       ){
      
           
         return ( <span className="cardSpan" key={index}><img  className="cardImage" alt={card?card.name:""} src={card?card.imageUrl:''}  /></span>);
   
       }  
       else return '';  
   });
   }







  return (
  <div className="landPage">

      <div>Browse the land cards you can use.</div>
      <div className="landCardDiv">
      <span onClick={(e)=>this.props.nextLandCard(-1)} className="nextPrevious">&#8249;</span> {landCards}<span  onClick={(e)=>this.props.nextLandCard(1)} className="nextPrevious">&#8250;</span>
    </div>
       </div>
 
    
   );
  }
}
function mapStateToProps(state)
{


    return state;
}
export default connect(mapStateToProps,{nextLandCard:nextLandCard})(Land);