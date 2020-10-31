import React,{useState, useEffect, useRef} from 'react';
import './Trivia.css';
import data from "../data/Apprentice_TandemFor400_Data.json";
import ReactCountdownClock from 'react-countdown-clock';

import Finish from "./Finish"

function Trivia(props) {
    //game stats, would implement Redux or Context API 
    const [stats, setStats] = useState({
        index: 0,
        answerClick:0,
        finish:false,
        time:180,
    })

    const [options,setOptions] = useState([])
    const [score, setScore] = useState(0)

    //use refs to get the options
    const optionRef = useRef(null);


    useEffect(() => {
        // combine and randomize answers
        const options = data[stats.index].incorrect.concat(data[stats.index].correct);
        shuffleArray(options);
        setOptions(options)
        
    },[stats]);

    //helper function to randomize the answers
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    //finish the quiz, update the state
    function finish() {
        setStats({
            ...stats,
            finish: true});
    }

    //go to the next question
    function nextQuestion(){
        //check is it's the last question
        if(stats.index + 1 === data.length){
            finish()
        } else {
             //update stats
            setStats({
                ...stats,
                index: stats.index+1,
                answerClick:0,
            });
            //clear out the right and wrong options
            if(optionRef.current !== null){
                optionRef.current.parentNode.childNodes.forEach(element => {
                    if(element.localName === "div"){
                        element.classList.remove("answer-button__correct");
                        element.classList.remove("answer-button__incorrect");
                    }
                });
            }
        }
    }

    //check if the user picked the correct answer
    function checkIfCorrect(e){
        stats.answerClick += 1;
        if(stats.answerClick === 1){
            //allow choosing an answer only once
            if(data[stats.index].incorrect.includes(e.target.innerHTML)){
                e.target.classList.add("answer-button__incorrect")
            } else {
                e.target.classList.add("answer-button__correct")
                setScore(score + 1);
            }
        }
    }
   
    if(stats.finish === false){
        return (
            <div className = "main">
             <div className = "trivia-menu">
                    <div className="time-container">
                        <ReactCountdownClock seconds={stats.time}
                            color="#23D9B7"
                            alpha={0.9}
                            size={60}
                            onComplete={() => finish()}
                        />
                    </div>
                        <div className = "questionCount">
                            Question {stats.index + 1} out of {data.length}
                        </div>
                        <div className = "score">
                            Score: {score}
                        </div>
                        {/* <div className = "player">
                            Player: {stats.player}
                        </div> */}
                </div>
            <div className = "trivia">
                <div className = "question">
                    {data[stats.index].question}
                </div>
                <div className = "answers">
                    {options.map (item => (
                        <div className = "answers-button answer-button__default" onClick = {checkIfCorrect} ref={optionRef}>{item}</div>
                    )) }
                </div>
                <button className="next-button" onClick = {() => nextQuestion()}>Next</button>
            </div>
        </div>
        );
    } else if (stats.finish === true){
        return <Finish stats = {stats} setStats = {setStats} score = {score}/>
    }
}

export default Trivia;