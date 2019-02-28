import React, { Component } from 'react';
import './App.css';
import ActivityBoard from './components/ActivityBoardComponent';
const util = require('util')

class App extends Component {
  constructor(){
    super();

    this.state = {
      activities: [],
      editingActivityId: null
    }
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

  addNewActivity = (event) => {
    event.persist();
    // console.log("event: " + event)
    fetch("http://localhost:3001/api/v1/activities", {
      method: 'post',
      mode: 'cors',
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        activity: 
        {
          title: "999",
          neighborhood: "post neigh",
          link:  "post link",
          time: 5.0,
          notes:  "post notes",
          activity_type: "post types"
        }
        })
      }).then(response => {
        console.log('inside response from post')
        // console.log(response.json())
        return response.json()
      }).then(data => {
        console.log("new activity: " + util.inspect(data,false,null,true))
        console.log("id: " + data.id)
        this.setState({
          activities: [data, ...this.state.activities], 
          editingActivityId: data.id
        }, () => {
          // console.log(this.state.activities);
          console.log("activityid: " + this.state.editingActivityId);
         })
    }).catch(error => console.log(error))
  }

  updateIdea = (activity) => {
    const activityIndex = this.state.activities.findIndex(x => x.id === activity.id)
    const activities = this.state.activities
    activities[activityIndex] = activity

    this.setState({activities: activities})
  }


  render() {
    return (
      <div>
        <h1>Activities Board</h1>
        <ActivityBoard title="Berlin Activities" activities={this.state.activities} editingActivityId={this.state.editingActivityId} addNewActivity={this.addNewActivity} updateIdea={this.updateIdea} ></ActivityBoard>
      </div>
    );
  }
}

export default App;
