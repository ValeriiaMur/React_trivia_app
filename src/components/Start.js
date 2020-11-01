import React from 'react';
import './Start.css';
import {Link} from "react-router-dom";
import mainImage from '../assets/main-img.png'

function Start({stats, setStats,handleChanges}) {

    return (
        <div className = "start-page">
        <h2>Do you think you know everything? Test yourself with this trivia!</h2>
        <p> You have only 3 minutes to answer all the questions</p>
        <img className="main-img" src={mainImage} alt="Start trivia"/>
        <Link to="/trivia" className="start-button">Start</Link>
        </div>
    );
}

export default Start;
