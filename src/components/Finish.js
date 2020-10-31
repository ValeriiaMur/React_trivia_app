import React from 'react';
import './Finish.css';
import {Link} from "react-router-dom";
import finishImg from "../assets/finish.png";
import data from "../data/Apprentice_TandemFor400_Data.json";

function Finish({stats,setStats, score}) {

  function playAgain(){
    setStats({
      ...stats,
      index: 0,
      answerClick:0,
      finish:false,
      time:180,
    })
  }

  return (
    <div className = "finish-page">
      <h2>Finish!</h2>
      <img className = "finishImg" src = {finishImg} alt="End of quiz"></img>
      <h2>Your results:</h2>
      <div className = "score">{score} / {data.length}</div>
      <Link className = "again-button" onclick = {playAgain} to = "/">Play again</Link>
    </div>
  );
}

export default Finish;