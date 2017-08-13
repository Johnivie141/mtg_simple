import React, { Component } from 'react';

import { findDOMNode } from 'react-dom';

import {connect} from 'react-redux'
import {postCombat,pcTurn} from './../../store/reducer'
import './Combat.css';

import jQuery from 'jquery';
import 'jquery-ui-dist/jquery-ui.js';
export class Combat extends Component{
    constructor(props){
        super(props);
        this.handleExplosion =this.handleExplosion.bind(this);
    }
 handleExplosion (creature) {
       var el=null;
       switch(creature){
           case 'pcCombatCreature':
                el = findDOMNode(this.refs.pcCombatCreature);
                break;
            case 'playerCombatCreature':
                el = findDOMNode(this.refs.playerCombatCreature);
                break;
            default:
              el =null;
       }
       
    
      
        if (el){
          jQuery(el).effect("explode",{pieces:32});
        }
    };

    

componentWillMount(){

    if (this.props && this.props.pc && this.props.pc.hasPicked===false){

     this.props.pcTurn();
    }
    
}
componentWillUnmount(){
    if (this.props && this.props.postCombat)
        this.props.postCombat();

}

componentWillReceiveProps(ownProps)
{
    if (ownProps && ownProps.pc && ownProps.pc.hasPicked){
        
        if (ownProps.player.combatCreature){
            if (ownProps.pc.combatCreature){
                if (ownProps.pc.combatCreature.power >= ownProps.player.combatCreature.toughness){
                    //explode playerCombatCreature image
                    setTimeout(()=>this.handleExplosion("playerCombatCreature"),1000);   
                     

                }
            }
        }

        if (ownProps.pc.combatCreature){
            if (ownProps.player.combatCreature){
        
                if (ownProps.player.combatCreature.power >= ownProps.pc.combatCreature.toughness){
                    //explode pcCombatCreature image
                    setTimeout(()=>this.handleExplosion("pcCombatCreature"),1000);        

                }
            }
        }


    }
}






 render(){


     let pcExplosion='';
        


       
     let playerCreature='';
    let pcCreature='';
    let card='';
    if (this.props && this.props.player && this.props.player.combatCreature){
        card = this.props.player.combatCreature;
        playerCreature=(<span className="cardSpan">
          <img ref="playerCombatCreature" 
          
          className="cardImage" alt={card?card.name:""} src={card?card.imageUrl:''}  /></span>);

           
    }

    if (this.props && this.props.pc && this.props.pc.combatCreature){
        card  = this.props.pc.combatCreature;
        pcCreature=(<span className="cardSpan">
          <img   ref="pcCombatCreature" 
      
          className="pcCombatCreature cardImage" alt={card?card.name:""} src={card?card.imageUrl:''}  /></span>);
     
    }
    
  return (
  <div className="combatPhase">


     <div className="creatureDiv">
      <span className="pcCombatCreature">{pcCreature}</span>{pcExplosion}
      <span className="playerCombatCreature">{playerCreature}</span>
      </div>
       </div>
   );
  }
}
function mapStateToProps(state)
{

    return state;
}
export default connect(mapStateToProps,{postCombat:postCombat,pcTurn:pcTurn})(Combat);