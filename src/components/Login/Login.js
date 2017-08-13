import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login} from './../../store/reducer'
import './Login.css'



class Login extends Component{

 


 render(){
  return (<div className="loginPage">
       <div>
           <span className="playerName">
               <span className="labelSpan">
               <label  htmlFor="playerName">Name</label>
               </span>
            <input className="input" ref="playerName" type="text" />
            <button className="btn btn-primary" onClick={(e)=>this.props.login(this.refs.playerName.value)}>
               Login
            </button>
           </span>
       </div>
      
       </div>
   );
  }
}
function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps,{login:login})(Login)