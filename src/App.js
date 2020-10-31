import React from 'react';
import './App.css';
import {BrowserRouter as Router,
        Switch,
        Route
} from "react-router-dom";

//components
import Trivia from "./components/Trivia";
import Start from "./components/Start";
import Finish from "./components/Finish"


function App() {

  // const handleChanges = e => {
  //   setStats({player: e.target.value});
  // };

  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path ="/" component = {Start}/>
        <Route path ="/trivia" component = {Trivia}/>
        <Route path ="/finish" component = {Finish}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
