import React, { Component } from "react";
import QuestionList from "./components/quiz/QuestionList";
import Scorebox from "./components/quiz/Scorebox";
import Results from "./components/quiz/Results";
import "./App.css";
import { createQuizData as quizData } from "./api/opentdb";
import Start from "./components/quiz/Start";
// import { Button } from "react-bootstrap/lib/InputGroup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      score: 0,
      current: 0,
      loading: true,
    };
  }

  setCurrent(current) {
    this.setState({ current });
  }

  setScore(score) {
    this.setState({ score });
  }

  async componentDidMount() {
    try {
      this.setState({ questions: await quizData(), loading: false });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const date = new Date();
    if (this.state.loading === false) {
      if (this.state.current >= this.state.questions.length) {
        var scorebox = "";
        var results = <Results {...this.state} />;
      } else {
        scorebox = <Scorebox {...this.state} />;
        results = "";
      }
      return (
        <div>
          <span>{date.toLocaleTimeString()}</span>
          <div>
            {scorebox}
            <QuestionList
              {...this.state}
              setCurrent={this.setCurrent.bind(this)}
              setScore={this.setScore.bind(this)}
            />
            {results}
          </div>
        </div>
      );
    } else {
      alert("Start by pressing the ok button!!!");
    }
  }
}

export default App;
