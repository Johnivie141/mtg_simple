import axios from 'axios';
 const  magickUrl=`https://api.magicthegathering.io/v1/cards`;

// function supports_html5_storage() {
//   try {
//     return 'localStorage' in window && window['localStorage'] !== null;
//   } catch (e) {
//     return false;
//   }
// }

export function getMagickCards(isPlayer){

       
           let pagenum = Math.floor(Math.random()*200);
           if (isPlayer) pagenum=0;
           let fullUrl = magickUrl + `?page=${pagenum}&types=creature|land`

          return  axios.get(fullUrl).then((res) =>{
           let tmpCards=res.data.cards.filter(
           (card)=>{return (( card.toughness && card.toughness>0  && card.power && card.power >0)|card.types[0]==='Land')}); 
            let newCards=[];
            while(newCards.length<50){
              newCards=newCards.concat(tmpCards);
            }

            
            return  newCards;
           });
         
       
}
