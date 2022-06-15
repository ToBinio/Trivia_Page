import React, {Component} from 'react';
import './NavBar.scss'

class NavBar extends Component {
    render() {
        return (
            <div className='navBar'>
                <h1>Trivia</h1>
                <ul>
                    <li><a href="/Users/Public">Home</a></li>
                    <li><a href="/daily">Daily</a></li>
                    <li><a href="/random">Random</a></li>
                </ul>
            </div>
        );
    }
}

export default NavBar;