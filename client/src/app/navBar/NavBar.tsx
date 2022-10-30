import React, {Component, useEffect} from 'react';
import './NavBar.scss'

function NavBar() {

    return (
        <div className='navBar'>
            <h1>Trivia</h1>
            <ul>
                <li><a href="/Users/Public">Home</a></li>
                <li><a href="/daily">Daily</a></li>
                <li><a href="/random">Random</a></li>
            </ul>
        </div>
    )
}

export default NavBar;