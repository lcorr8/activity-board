import React, { Component } from 'react';
import './App.css';
import ActivityBoard from './components/ActivityBoardComponent';
const util = require('util')

class App extends Component {
  constructor(){
    super();

    this.state = {
      activities: []
    }
  }

  componentDidMount(){
    console.log("inside component did mount")
    fetch('http://localhost:3001/api/v1/activities')
    .then(results => {
      return results.json();
    }).then(data => {
      //select data to return
      console.log('data: ' + util.inspect(data,false,null,true))
      data.map((activity) => {
        console.log("activity: " + activity.title)
      })
      this.setState({activities: data}, () => {
        console.log("state has been set")
      })
    }).catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <h1>Activities Board</h1>
        <ActivityBoard title="Berlin Activities" activities={this.state.activities} ></ActivityBoard>
      </div>
    );
  }
}

export default App;
