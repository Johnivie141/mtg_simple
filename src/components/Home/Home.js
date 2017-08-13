import React, { Component } from 'react';
import {connect} from 'react-redux'
import './Home.css';
import phaseroutes from './../../services/phaseRouter';


export class Home extends Component{



 render(){
  return (<div className="homePage">
       <div className="container">
         <div className="jumbotron">
           <h1>Magic the Gathering: Simple</h1> 
           <p>Welcome player we hope you have fun.</p>

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
export default connect(mapStateToProps)(Home);