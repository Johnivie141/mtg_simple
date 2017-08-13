

export function canSelectCreature(creatureCard,LandCards){
      let landArray=LandCards;
      let autoSelect=[];
      let card =creatureCard;
      let manaCost = card.manaCost;
      let cardFailure=false;
      let success=false;
      manaCost.replace(/\{([A-Z])\}/g,function(m,x){
        
         
         for (let i=0;i<landArray.length;i++){
             if (landArray[i].colorIdentity.indexOf(x)!==-1 && autoSelect.indexOf(i)===-1){
                 autoSelect.push(i);
                 success=true;
                 break;
             }
         }
         if (success===false){
             cardFailure=true;
         }
         return "";

      })
let count=0;
      manaCost.replace(/\{([0-9]+)\}/g,function(m,x){
         for (let i=0;i<landArray.length;i++){
             if (autoSelect.indexOf(i)===-1){
                 autoSelect.push(i);
                 count++;
                 if (count === x) {
                     break;
                 }                 

             }
         }
         if (count <x){

             cardFailure=true;
         }
         return "";

      })

     
      // if cardFailure is true we can't play this card 
      // otherwise play
       return (!( cardFailure===true));


}