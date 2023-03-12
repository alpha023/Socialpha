

import React from 'react';
import './logoutmenu.css'
import {useState, useEffect, useRef} from 'react';

const LogoutMenu = () => {
    
  
    return (
      <div className="App">
        
      </div>
    );
}
function DropdownItem(props){
    return(
      <li className = 'dropdownItem'>
        <img src={props.img}></img>
        <a> {props.text} </a>
      </li>
    );
}
  

export default LogoutMenu
