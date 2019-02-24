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

  addNewActivity = (event) => {
    event.persist();
    console.log(event)
    fetch("http://localhost:3001/api/v1/activities", {
      method: 'post',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        activity: 
        {
          title: "from post api title",
          neighborhood: "post neigh",
          link:  "post link",
          time: 5.0,
          notes:  "post notes",
          activity_type: "post types"
        }
        })
      }).then(response => {
        console.log('inside response from post')
        console.log(response)
    }).catch(error => console.log(error))
  }

  componentDidMount(){
    // console.log("inside component did mount")
    fetch('http://localhost:3001/api/v1/activities')
    .then(results => {
      return results.json();
    }).then(data => {
      //select data to return
      // console.log('data: ' + util.inspect(data,false,null,true))
      data.map((activity) => {
        // console.log("activity: " + activity.title)
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
        <ActivityBoard title="Berlin Activities" activities={this.state.activities} addNewActivity={this.addNewActivity} ></ActivityBoard>
      </div>
    );
  }
}

export default App;
