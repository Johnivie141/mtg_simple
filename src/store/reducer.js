import {getMagickCards} from '../services/apiServices';

import {canSelectCreature} from './../utils/utils';
//import {EVEN_BATLE,UNEVEN_BATTLE,UNDEFENDED,getBattleTexts} from '../services/descriptiveText';


export const SELECT_PHASE="SELECT";
export const DRAW_PHASE="DRAW";
export const COMBAT_PHASE="COMBAT";
export const STARTSCREEN="STARTSCREEN";


const LOGIN="LOGIN";
const NEXT_CARD="NEXT_CARD";
const NEXT_LAND_CARD="NEXT_LAND_CARD";
const INITIALIZE="INITIALIZE";
const CHANGE_PHASE="CHANGE_PHASE";
const GET_PLAYER_CARDS="GET_PLAYER_CARDS";
const GET_PC_CARDS="GET_PC_CARDS";
const LOCAL_PLAYER_CARDS="LOCAL_PLAYER_CARDS";
const LOCAL_PC_CARDS="LOCAL_PC_CARDS";
const DRAW_HAND="DRAW_HAND";
const PICK_CARD="PICK_CARD";
const NEW_LAND="NEW_LAND";
const NEW_CREATURE="NEW_CREATURE";
const POST_COMBAT="POST_COMBAT";
const PC_TURN="PC_TURN";
const CHANGE_SETTING="CHANGE_SETTING";
const GET_SETTING ="GET_SETTING";
const NEW_GAME="NEW_GAME";





function pickACard(cards){
    let newCard =cards.splice(Math.floor(Math.random()*(cards.length -1)),1)[0];
return newCard;
}

export function login(name){
    return {
        type:LOGIN,
        payload:{name:name}
    }
}

export function newGame(){
    return {type:NEW_GAME,
    payload:null}
}
export function changeSetting(settingKey,settingValue){
    return {
        type: CHANGE_SETTING,
        payload:{key:settingKey,
         value:settingValue    
    }
    }
}
export function getSetting(){
    return {
        type:GET_SETTING,
        payload:null
    }
}
export function pcTurn(){
    return {
        type: PC_TURN,
        payload:null
    }
}
export function postCombat(){
    return {
        type:POST_COMBAT,
        payload:null
    }
}

export function newCreature(position){
    return {
        type:NEW_CREATURE,
        payload:position
    }
}
export function newLand(position){
    return {
        type:NEW_LAND,
        payload:position
    }
}

export function nextCard(value){
    return{ 
        type:NEXT_CARD,
        payload:value
    }

}

export function nextLandCard(value){
    return{ 
        type:NEXT_LAND_CARD,
        payload:value
    }

}
export function pickCard(){
   return {
       type:PICK_CARD,
       payload:null
   }

}


export function getPlayerCards(){
    let supportsHtml5Storage=supports_html5_storage();
    if(supportsHtml5Storage){
        let playerCards = localStorage.getItem("playerCards");
        if (playerCards){
          return{
            type:LOCAL_PLAYER_CARDS,
            payload:playerCards
          }
        }
        else{
          return {
          type:GET_PLAYER_CARDS,
          payload:getMagickCards(true)
         }
       }
     }
}

export function getPCCards(){

    let supportsHtml5Storage=supports_html5_storage();
    if(supportsHtml5Storage){
        let playerCards = localStorage.getItem("playerCards");
     
        if (playerCards){
          return{
            type:LOCAL_PC_CARDS,
            payload:playerCards
          }
        }
        else{
          return {
             type:GET_PC_CARDS,
              payload:getMagickCards(false)
        }
      }
    }
}

export function drawHand(){
    return {
        type: DRAW_HAND,
        payload:null 
  }
}

export function changePhase(){
    return {
        type:CHANGE_PHASE,
        payload:null
    }
}

export function  initializeState(){
    return {
        type:INITIALIZE,
        payload:null
    }
}

let initialState={
phase:STARTSCREEN,
nextPhase:DRAW_PHASE,
readyNextPhase:false,
settingsCheck:false,
player:{
   deck:null,
   hand:null,
   newCard:null,
  
   life:20,
   land:[],
   combatCreature:null,
   newLand:null,
   selectedPosition:0,
   landSelectedPosition:0,
   playedCards:[]

},
endGame:false,
message:'',
settings:{
    preLandCount:0,
    playerLifePoints:20,
    pcLifePoints:20,
    gamesWon: 0,
    gamesLost:0,
    handSize:8,
    wonCard:null
},

pc:{
    deck:null,
    hand:null,

    life:20,
    land:[],
    newLand:null,
    combatCreature:null,
    playedCards:[],
    hasPicked:false,
    name: 'Ares',
    gamesWon:0,
    gamsLost:0,
    computerCanPlayLand:true,
    wonCard:null
}

}


function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}




export default function reducer(state=initialState,action){
  let newPlayerState;
  let newPCState;
  let newCards;
  let message='';
  let newReadyNextPhase=false;
       switch(action.type){

  


         //Initialize Card Decks
          case LOCAL_PLAYER_CARDS :
               
                newPlayerState = Object.assign({},state.player);
          
                newPlayerState.deck=JSON.parse(action.payload);
                 
                
                return Object.assign({},state,{player:newPlayerState});


            case LOCAL_PC_CARDS :
                newPCState = Object.assign({},state.pc)
                newPCState.deck=JSON.parse(action.payload);
                
                return Object.assign({},state,{pc:newPCState});

           case GET_PLAYER_CARDS + "_FULFILLED":
                newCards = action.payload;
                localStorage.setItem("playerCards",JSON.stringify(action.payload));
                 newPlayerState= Object.assign({},state.player,{deck:newCards});
                 
                return Object.assign({},state,{player:newPlayerState});


            case LOGIN:
              newPlayerState= Object.assign({},state.player);
              newPlayerState.name = action.payload.name;
              localStorage.setItem("playerName",JSON.stringify(action.payload.name));
                

              return Object.assign({},state,{player:newPlayerState});


            case CHANGE_SETTING:
                let settingKey = action.payload.key;
                let settingValue = action.payload.value; 
                if (Number(settingValue) >0){
                  let newSettings= Object.assign({},state.settings)
                  newSettings[settingKey]=settingValue;

                  localStorage.setItem(settingKey,JSON.stringify(settingValue));
                
                  return Object.assign({},state,{settings:newSettings});
                }
                else{
                    return state;
                }


            case PC_TURN:
            newPCState = Object.assign({},state.pc);
            // choose land card
            if (newPCState.computerCanPlayLand){
            if (newPCState.newLand ===null){
             for (let i=0;i<newPCState.hand.length;i++){
                if (newPCState.hand[i].types[0] ==='Land'){
                   newPCState.newLand = newPCState.hand.splice(i,1)[0];
                    i--;
                    break;
                 }
               }
              }
            }
            //choose createCard.
            if (newPCState.combatCreature ===null){
                
             for (let i=0;i<newPCState.hand.length;i++){

                if (newPCState.combatCreature ===null && newPCState.hand[i].types.indexOf("Creature")!==-1){
                 
                    if (canSelectCreature(newPCState.hand[i],newPCState.land)){
                        
                        newPCState.combatCreature= newPCState.hand.splice(i,1)[0];
                        i--;
                        break;
                    }
                }
             }
            }
            newPCState.hasPicked=true;
            return Object.assign({},state,{readyNextPhase:true},{pc:newPCState});


   



            
            case POST_COMBAT:
             newPlayerState=Object.assign({},state.player);
             newPCState=Object.assign({},state.pc);
             newPCState.hasPicked=false;
            
             message='';
             let possessiveName='Your';
             let name='You';
             let verb="were"
             if (newPlayerState.name){
                 possessiveName = newPlayerState.name + "'s";
                 name = newPlayerState.name;
                 verb="was";
             }
             let playerDamage=0;
             let pcDamage=0;
             if (newPlayerState.combatCreature !==null){
                 pcDamage=newPlayerState.combatCreature.power
                  if (newPCState.combatCreature !==null){
                      pcDamage -= newPCState.combatCreature.toughness;  
                  }
             }

             if (newPCState.combatCreature !==null){
                 playerDamage=newPCState.combatCreature.power
                  if (newPlayerState.combatCreature !==null){
                      playerDamage -= newPlayerState.combatCreature.toughness;
                   }
             }
             if (playerDamage <0) playerDamage =0;
             if (pcDamage <0) pcDamage=0;

             if (playerDamage <=0 && pcDamage >0){
                 
                 if (newPCState.combatCreature)
                 {
                     // Player Won against defense
                  
                   message = message  + newPCState.name +"'s ";
                    message =message + newPCState.combatCreature.name   + " " + verb + " unable to defend against ";
                    message =message +    possessiveName + " " +  newPlayerState.combatCreature.name +'.';
                 }
                 else{
                     //Player Won against Undefended
                    message = message  + newPCState.name + ' ' + verb +" undefended against the attack of ";
                    message  = message + possessiveName + " " ;
                    message = message + newPlayerState.combatCreature.name + ".";   
                 }
             }
             else if (playerDamage >0 && pcDamage<=0){
                 if (newPlayerState.combatCreature)
                 {
                   //Computer Won Against Defended Player
                   message= message + possessiveName + ' ';
                    message = message + newPlayerState.combatCreature.name   +" " + verb + "  unable to defend against ";
                    message =message + newPCState.name   +"'s " +  newPCState.combatCreature.name +'.';
                 } 
                 else{

                     // Computer Won Against Undefended Player
                   
                    //    let battletext= getBattleTexts("UNDEFENDED",{
                    //     "LoserPossessive" :  possessiveName,
                    //     "LoserName" :name,
                    //     "LoserWas" :verb,
                    //     "WinnerName" :newPCState.name,
                    //     "WinnerPossesive": newPCState.name  + "'s",
                    //     "LoserCreature": newPlayerState.combatCreature,
                    //     "WinnerCreature": newPCState.combatCreature,
                    //     "WinnerDativePronoun" : "him"

                    //  })
                     
                     message=message  + name + ' ';                    
                    message = message + verb + " undefended against ";
                    message = message + newPCState.name   +"'s " +  newPCState.combatCreature.name +'.';
               
                 }
             }
             else{
                 if (newPCState.combatCreature && newPlayerState.combatCreature){
                  message=message +  name +  ' ';
                  message= message + 'and ' + newPCState.name + " were defended by their summoned creatures. Neither could gain advantage.";



                 }
                 
             }
            if (newPCState.combatCreature !==null)
               newPCState.playedCards.push(newPCState.combatCreature);
            if (newPlayerState.combatCreature !==null)
                newPlayerState.playedCards.push(newPlayerState.combatCreature);
           
            
             newPCState.life -= pcDamage;
            
             
             newPlayerState.life -= playerDamage;
             newPlayerState.combatCreature=null;
             newPCState.combatCreature=null;
             

             if(newPlayerState.newLand && newPlayerState.newLand !==null){
                 
                 newPlayerState.land.push(newPlayerState.newLand);
                 newPlayerState.newLand=null;
             }
             if(newPCState.newLand && newPCState.newLand !==null){
                 newPCState.land.push(newPCState.newLand);
                 newPCState.newLand=null;
             }
             let endGame=false;
            
             if (newPCState.life <=0 || newPlayerState.life <=0){
                  endGame=true;
                  
                  if (newPCState.land!==null)
                    newPCState.playedCards = newPCState.playedCards.concat(newPCState.land);
                  if (newPlayerState.land!==null)
                    newPlayerState.playedCards = newPlayerState.playedCards.concat(newPCState.land);
                  newPCState.land=[];
                  newPlayerState.land=[];
                  if (newPCState.life <=0 && newPlayerState.life >0){
                      // Player Won Send them a card
                      message=message + " " + newPCState.name +" was defeated by "+ name +".";
                      if (newPCState.playedCards!==null && newPCState.playedCards.length >0)
                        newPlayerState.wonCard=pickACard(newPCState.playedCards);
                      else{
                             newPlayerState.wonCard=pickACard(newPCState.deck);
                     
                      }
                     
                      if (newPlayerState.wonCard !==null)
                         newPlayerState.playedCards.push(newPlayerState.wonCard);
                  }
                  else if (newPlayerState.life <=0 && newPCState.life >0){
                      //computer won
                       message=message=" "+ name +" " + verb + " defeated by "+ newPCState.name +".";
                    
                      if (newPlayerState.playedCards!==null && newPlayerState.playedCards.length >0)
                         newPCState.wonCard = pickACard(newPlayerState.playedCards);
                      else
                         newPCState.wonCard = pickACard(newPlayerState.deck);

                      if (newPCState.wonCard!==null)
                        newPCState.playedCards.push(newPCState.wonCard);
                  }
                  //now merge cards and store result
        

                  if (newPCState.playedCards !==null)
                    newPCState.deck = newPCState.deck.concat(newPCState.playedCards)
                  if (newPCState.hand !==null)
                    newPCState.deck = newPCState.deck.concat(newPCState.hand);
                  newPCState.hand =[];
                  newPCState.playedCards =[];
                  if (newPlayerState.playedCards!==null)
                    newPlayerState.deck = newPlayerState.deck.concat(newPlayerState.playedCards);
                  if (newPlayerState.hand!==null) 
                    newPlayerState.deck = newPlayerState.deck.concat(newPlayerState.hand);
                  newPlayerState.hand=[];
                  newPlayerState.playedCards=[];
                  
                  localStorage.setItem("playerCards",JSON.stringify(newPlayerState.deck));
                  localStorage.setItem("pcCards",JSON.stringify(newPCState.deck));


             }
 
           
             return Object.assign({},state,{readyNextPhase:true},{message:message},{endGame:endGame},{player:newPlayerState,pc:newPCState});

            case GET_PC_CARDS + "_FULFILLED":
                newCards = action.payload;
                localStorage.setItem("pcCards",JSON.stringify(action.payload));
                newPCState= Object.assign({},state.pc,{deck:newCards});
            
                return Object.assign({},state,{pc:newPCState});
            
            case NEW_GAME:
              newPlayerState = Object.assign({},state.player);
              newPCState=Object.assign({},state.pc);
              newPCState.life=state.settings.pcLifePoints;
              newPCState.hand=null;
              newPlayerState.hand=null;
              newPlayerState.life=state.settings.playerLifePoints;
              // need to set up land cards
              // need
              return Object.assign({},state,{endGame:false,message:'',settingsCheck:false,phase:STARTSCREEN},{player:newPlayerState,pc:newPCState,phase:STARTSCREEN})           
            case GET_SETTING:

                let newSetting = Object.assign({},state.settings);
                
                 for (var prop in newSetting ){
                 
                 
                     let value = localStorage.getItem(prop);
             
                     if (value){
                       value = JSON.parse(value);
                       value =Number(value);
                       
                       newSetting[prop] = value;
                     }
                 }
                 
                 
                 newPlayerState = Object.assign({},state.player);
                 let newName = localStorage.getItem("playerName");
                 if (newName){
                     newPlayerState.name=JSON.parse(newName);
                 }
                  newReadyNextPhase=false;
                 if (state.phase===STARTSCREEN)
                    newReadyNextPhase=true;
              

                  newPCState = Object.assign({},state.pc);
                 

                 if (newSetting.hasOwnProperty("playerLifePoints"))
                     newPlayerState.life=newSetting["playerLifePoints"];
                 if (newSetting.hasOwnProperty("pcLifePoints"))
                    newPCState.life=newSetting["pcLifePoints"];
                  let newComputerCanPlayLand = JSON.parse(localStorage.getItem("computerCanPlayLand"));

                  if (newComputerCanPlayLand === "false") newComputerCanPlayLand=false;
                  else newComputerCanPlayLand = true;
                  newPCState.computerCanPlayLand = newComputerCanPlayLand;
                  
                  let newComputerName = JSON.parse(localStorage.getItem("computerName"));
                  if (!newComputerName) newComputerName = state.pc.name;
                  newPCState.name=newComputerName;
                  
                 

               
           
                return Object.assign({},state,{settingsCheck:true,readyNextPhase:newReadyNextPhase},{settings:newSetting},{player:newPlayerState},{pc:newPCState})
            // END Initialize Card Decks
           
            case NEXT_LAND_CARD:
              
              newPlayerState=Object.assign({},state.player);
              newPlayerState.landSelectedPosition+=action.payload;
              if (newPlayerState.landSelectedPosition <0) newPlayerState.selectedPosition +=newPlayerState.land.length;
              if (newPlayerState.landSelectedPosition >newPlayerState.land.length -1)
                  newPlayerState.landSelectedPosition =0;
            
              return Object.assign({},state,{player:newPlayerState});
        
            case NEXT_CARD:
              
              newPlayerState=Object.assign({},state.player);
              newPlayerState.selectedPosition+=action.payload;
              if (newPlayerState.selectedPosition <0) newPlayerState.selectedPosition +=newPlayerState.hand.length;
              if (newPlayerState.selectedPosition >newPlayerState.hand.length -1)
                  newPlayerState.selectedPosition =0;
            
              return Object.assign({},state,{player:newPlayerState});
            case PICK_CARD:
               
                newPCState = Object.assign({},state.pc);
                newPlayerState = Object.assign({},state.player);
                newPlayerState.newCard = pickACard(newPlayerState.deck);
                newPlayerState.hand.push(newPlayerState.newCard);
                newPCState.hand.push(pickACard(newPCState.deck));
                newReadyNextPhase=false;
                if (state.phase===DRAW_PHASE)
                   newReadyNextPhase=true;

                return Object.assign({},state,{readyNextPhase:newReadyNextPhase},{player:newPlayerState,pc:newPCState})

            case DRAW_HAND:
           
                // draw seven cards for each player
   
                 newPCState = Object.assign({},state.pc);
                 newPlayerState = Object.assign({},state.player);
                if (newPCState.deck === null || newPlayerState.deck===null)
                   return state;
                let pcHand=[];
                let playerHand=[];
               
                for (let i=0;i<state.settings.handSize;i++){
                  
                    let newPlayerCard =pickACard(newPlayerState.deck);
                     playerHand.push(newPlayerCard);
                    let newPCCard =pickACard(newPCState.deck);
                    
                     pcHand.push(newPCCard);
                }
                newPlayerState.hand=playerHand;
                newPCState.hand=pcHand;
                for (let i=0;i<state.settings.preLandCount;i++){
                    
                      for (let j=0;j<newPlayerState.deck.length;j++){
                         if (newPlayerState.deck[j].types[0]==='Land'){
                              newPlayerState.land.push(newPlayerState.deck.splice(j,1)[0]);
                             j--;
                             break;
                         }
                     }
                     for (let j=0;j<newPCState.deck.length;j++){

                         if (newPCState.deck[j].types[0]==='Land'){
                             newPCState.land.push(newPCState.deck.splice(j,1)[0]);
                             j--;
                             break;
                         }
                     }
                }


                return Object.assign({},state,{readyNextPhase:true},{player:newPlayerState,pc:newPCState});


            case NEW_LAND:
             newPlayerState=Object.assign({},state.player);
             newPlayerState.newLand= newPlayerState.hand.splice(action.payload,1)[0];
             if (newPlayerState.selectedPosition > newPlayerState.hand.length -1)
                newPlayerState.selectedPosition=0;

             return Object.assign({},state,{player:newPlayerState});

            case NEW_CREATURE:
             newPlayerState=Object.assign({},state.player);
             newPlayerState.combatCreature= newPlayerState.hand.splice(action.payload,1)[0];
             return Object.assign({},state,{player:newPlayerState});

          
          
            case CHANGE_PHASE:
            
            switch(state.phase){
                case STARTSCREEN: 
                  return Object.assign({},state,{nextPhase:SELECT_PHASE,phase:DRAW_PHASE,readyNextPhase:false});
                
                case DRAW_PHASE: 
                  return Object.assign({},state,{nextPhase:COMBAT_PHASE,phase:SELECT_PHASE,readyNextPhase:true})
           
                case SELECT_PHASE: 
                  return Object.assign({},state,{nextPhase:DRAW_PHASE,phase:COMBAT_PHASE,readyNextPhase:false})
           
                case COMBAT_PHASE: 
                  return Object.assign({},state,{nextPhase:SELECT_PHASE,phase:DRAW_PHASE,readyNextPhase:false})
                default: return state;

            }
            
            
           
        
      
               
            
               
            default: return state;
       }


    
}
