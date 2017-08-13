import React, { Component } from 'react';
import {connect} from 'react-redux'





import './Main.css';






import Combat from './../Combat/Combat'
// Combat Phase Both Your card and Your opponents card are visible
 
 import Draw from './../Draw/Draw';
// Draw Phase will allow you to see your new card in maximum resolution.
// It will automatically pass to the the next phase in 2 seconds.
 import StartScreen from './../StartScreen/StartScreen'
  // Show Play Button.

  import Select from './../Select/Select';
// Phase for Selecting Land/Combat creature
// Only Allowed to select one of each
// After a creature is played it goes into the played pile.

import {STARTSCREEN,DRAW_PHASE,COMBAT_PHASE,SELECT_PHASE} from './../../store/reducer';
import {getSetting,getPlayerCards,getPCCards,drawHand,changePhase} from './../../store/reducer';


 class Main extends Component{
constructor(props){
    super(props)
    this.goToNextPhase = this.goToNextPhase.bind(this);
    this.getPhaseComponent = this.getPhaseComponent.bind(this);
}

goToNextPhase(nextPhase){
    

  if (this.props && this.props.phase){
      if (this.props.nextPhase=== nextPhase){
          if (this.props.readyNextPhase){
              this.props.changePhase();
          }
          else{
              setTimeout((e)=>this.goToNextPhase(nextPhase),50);
          }
      }
     
  }
}

getPhaseComponent(phase){
      switch(phase){
       
         case SELECT_PHASE :
            
            return (<Select history={this.props?this.props.history:''}/>);
         case DRAW_PHASE :
            
            return (<Draw history={this.props?this.props.history:''}/>);
         case COMBAT_PHASE:
            
            return (<Combat history={this.props?this.props.history:''}/>);
    
         default: return (<StartScreen history={this.props?this.props.history:''}/>)
       }
}




stateCheck(ownProps){

  if (ownProps !==null){
      if (ownProps && ownProps.settingsCheck===false){
          this.props.getSetting();
      }
       if (ownProps.settingsCheck){   
        if (ownProps.player.deck===null){
           ownProps.getPlayerCards();
         }
        if (ownProps.pc.deck===null){
            ownProps.getPCCards();
        }
     
        if (ownProps.player.deck!==null && ownProps.player.hand===null  &&ownProps.pc.deck!==null){
             ownProps.drawHand();
        }
        }
    }

}



componentDidMount(){
 
    this.stateCheck(this.props);
}
componentWillReceiveProps(ownProps){
  this.stateCheck(ownProps);
}


 render(){
//select phase



let phasediv=this.getPhaseComponent(this.props.phase);
let playerLife=20;
let pcLife=20;
let pcMaxLife=20;
let playerMaxLife=20;
let playerLifeWidth='0px';
let pcLifeWidth='0px';

let nextPhaseName="Draw";
if (this.props){
  if (this.props.player && this.props.player.life){
      playerLife = this.props.player.life;
      playerMaxLife = this.props.settings.playerLifePoints;
  }
  if (this.props.pc && this.props.pc.life){
      pcLife = this.props.pc.life;
      pcMaxLife = this.props.settings.pcLifePoints;
      }
  if (this.props.phase){
      switch (this.props.phase){
          case STARTSCREEN:
             nextPhaseName="Play";
             break;
          case DRAW_PHASE:
              nextPhaseName="Select";
              break;
           case SELECT_PHASE:
             nextPhaseName="Combat";
             break;
             case COMBAT_PHASE:
               nextPhaseName="Draw";
             break;   
           default:
              nextPhaseName="Draw";
              break;
      }
  }
  


       
       pcLifeWidth = pcLife/pcMaxLife * 100 ;
       pcLifeWidth = `${pcLifeWidth}px`;
       playerLifeWidth = playerLife/playerMaxLife * 100 ;
       playerLifeWidth = `${playerLifeWidth}px`;
}

if(!(this.props && this.props.player && this.props.player.hand))
   return (<div className="mainPage"></div>);
else
  return (
  <div className="mainPage">
      <div className="infoBar ">


       
<div className='lifeBar'><span className="lifeBarStatus" 
style={
   {
       "height":"20px",
    "width":pcLifeWidth,
    "display":"inline-block",
    
    "backgroundColor":"green",
    "opacity":"0.8"
   }

}>
</span>
 </div>
 


              
        <div className="nextPhase">
            <button className="btn btn-primary" 
              onClick={(e)=>this.goToNextPhase(this.props.nextPhase)}>
              ->{nextPhaseName}</button>
        </div>
      <div className="infoBar ">


       
<div className='lifeBar'><span className="lifeBarStatus" 
style={
   {
       "height":"20px",
    "width":playerLifeWidth,
    "display":"inline-block",
    
    "backgroundColor":"green",
    "opacity":"0.8"
   }

}>
</span>
</div>
 </div>
       </div>
        
        {phasediv}
              </div>
   );
  }
}


function mapStateToProps(state,ownProps)
{
  if (ownProps && ownProps.history && !(state && state.history) ){
    return Object.assign({},state,{history:ownProps.history})
}

   
    return state;
}
export default connect(mapStateToProps,{getSetting:getSetting,drawHand:drawHand,getPlayerCards:getPlayerCards,getPCCards,changePhase:changePhase})(Main);