import React, { Component } from 'react';
import hearts from "./hearts.json";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Card from "./components/Card";

import './App.css';




class App extends Component {
  state = {
    hearts: hearts,
    currentScore: 0,
    highScore: 0,
    chosenhearts: [],
    actionResponse: ""
  }

  
  shufflehearts(){
    let newhearts = hearts;
    for (let i = newhearts.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newhearts[i], newhearts[j]] = [newhearts[j], newhearts[i]];
    }
    this.setState({hearts: newhearts});
  }

  
  evaluateClick(id){
    if(this.state.chosenhearts.includes(id)){
      this.Wrongguess(id);
    }else{
       
      this.handleCorrectClick(id);
    }

  }

  
  handleCorrectClick(id){

    
    let morechosenhearts = this.state.chosenhearts;
        morechosenhearts.push(id);
        this.updateScore();  

    
    if(this.state.chosenhearts.length < this.state.hearts.length){
        this.setState({actionResponse: "", chosenhearts: morechosenhearts})
          this.shufflehearts();
          

    } else {
      console.log("for the win" + this.state.currentScore);
      this.endGuess(id);
      alert("You win!");
      
    }
  }

 
  Wrongguess(id){
    this.setState({actionResponse: "Wrong one"});
      alert("You chosen wrong card!");
    this.endGuess(id);
  }

  endGuess(id){
    console.log("End" + this.state.currentScore);

    let freshchosenKitsArray = [];

    if(this.state.currentScore > this.state.highScore){
      this.newHighScore();
    }

    this.setState(
      { 
      chosenhearts: freshchosenKitsArray, 
      currentScore: 0,
      actionResponse: "Can you feel my heartbeat"})
    this.shufflehearts();
  }

  updateScore(){
    
    let newScore = this.state.currentScore + 1;
    this.setState({currentScore: newScore});
    
  }


  newHighScore(){
    let newHighScore1= this.state.currentScore;
    this.setState({highScore: newHighScore1})
  }

  render() {
    return (
        <Wrapper>
            <Title>Guessing Heart </Title>
            <h2>Click on an image to earn points, but don't click on any more than once!</h2>
            <br/>
            
            <h3 className="Guess">
                Correct Guesses: {this.state.currentScore} 
                <br />
                Best Score: {this.state.highScore} 
            </h3>
            {this.state.hearts.map(heart => 
                <Card
                key={heart.id} id={heart.id} src={heart.src} alt={heart.alt} onClick={this.evaluateClick.bind(this)}
                />
            )}
        </Wrapper>
    );
} 

}

export default App;
