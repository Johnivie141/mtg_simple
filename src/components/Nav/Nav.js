import React, { Component } from 'react';

import './Nav.css';
import {Link} from 'react-router-dom';
export class Nav extends Component{

 


 render(){
  return (
<nav className="navbar navbar-inverse">
         <div className="container-fluid">
		  <div className="navbar-header">
		   <Link className="navbar-brand" to="/">
		      Home
           </Link>
		   </div>

        <ul className="nav navbar-nav">
			
				  <li><Link to="/land">Land</Link></li>
          <li><Link to="/settings">Settings</Link></li>

          <li><Link to="/login">Login</Link></li>
          <li><Link to="/about">About</Link></li>

        </ul>
       </div>
		   
      </nav>

   );
  }
}
export default Nav