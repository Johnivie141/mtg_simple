

/*
 newPCState.name +"'s ";
 newPCState.combatCreature.name   + " " + verb + " unable to defend against ";
 possessiveName + " " +  newPlayerState.combatCreature.name +'.';
                
"#LoserPossessive# #LoserCreature# was unable to defend #LoserDativePronoun# against #WinnerPossessive# #WinnerCreature#.";

#LoserName" was not able to summon any defense against "#WinnerName",

#LoserName# and #WinnerName# seem to be on even terms, neither gained advantage this round."
*/


export const EVEN_BATTLE="EVEN_BATTLE";
export const UNEVEN_BATTLE="UNEVENT_BATTLE";
export const UNDEFENDED ="UNDEFENDED";

const battleTexts={
 EVEN_BATTLE:[
"#LoserName# and #WinnerName# seem to be on even terms, neither gained advantage this round."
],
 UNEVEN_BATTLE:[
     "#LoserPossessive# #LoserCreature# was unable to defend #LoserDativePronoun# against #WinnerPossessive# #WinnerCreature#."
],
 UNDEFENDED:[
"#LoserName# #LoserWas# not able to summon any defense against #WinnerPossesive# attack."


 ],

};



export function getBattleTexts(battleType,words){
    let text="";
    let index = Math.floor(Math.random()*(battleTexts[battleType].length -1));
    console.log("battle index " + index)
    text= battleTexts[battleType][index];
    
console.log("BATTLE TEXT:"+ text);
    for (var prop in words){
       var re = new RegExp("#"+prop+"#"); 
      console.log("prop " +prop);
       console.log(re.test(text));
       let replaceString=words[prop];
       console.log("replace with "+replaceString)
        text = text.replace(re,replaceString);
    }
   console.log(text);
}
const victoryTexts={
"withoutDamage":[],
"smallDamage":[],
"heavyDamage":[],
}







//export function victory();