import React, { Component } from 'react';
import {connect} from 'react-redux'
import './About.css';
export class About extends Component{



 render(){
  return (<div className="aboutPage">
       <div className="container">
         <div className="jumbotron">
           <h1>Magic the Gathering: Simple</h1> 
           <p>This is a simplified version of Magic the Gathering</p> 
           <div className="tutorial">
           <p> During your select phase:</p>
           <p> &nbsp;&nbsp;You can select 1 land card</p>
           <p> &nbsp;&nbsp;You can select 1 creature card</p>
           <p> During the combat phase:</p>
           <p> &nbsp;&nbsp;Victory is determined only by power and toughness.</p>
           <p> Special abilities like flying are not used </p>
           </div>

    </div>
    </div>

       </div>
   );
  }
}
function mapStateToProps(state)
{

    return state;
}
export default connect(mapStateToProps)(About);