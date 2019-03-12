import React, { Component } from 'react';
import './App.css';
import ActivityBoard from './components/ActivityBoardComponent';
import update from 'immutability-helper';
const util = require('util')

class App extends Component {
    constructor() {
        super();

        this.state = {
            activities: [],
            editingActivityId: null,
            notification: ""
        }
    }

    resetNotification = () => {
        this.setState({notification: ""})
    }

    componentDidMount() {
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
                this.setState({ activities: data }, () => {
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
                    title: "",
                    neighborhood: "",
                    link: "",
                    time: 0,
                    notes: "",
                    activity_type: ""
                }
            })
        }).then(response => {
            console.log('inside response from post')
            // console.log(response.json())
            return response.json()
        }).then(data => {
            console.log("new activity: " + util.inspect(data, false, null, true))
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
        console.log("Inside update idea")
        console.log("activity: \n" + util.inspect(activity,false,null,true))
        const activityIndex = this.state.activities.findIndex(x => x.id === activity.id)
        const activities = this.state.activities
        activities[activityIndex] = activity

        this.setState({ activities: activities, notification: "All changes saved!" })
    }

    enableEditing = (id) => {
        this.setState({editingActivityId: id})
    }

    deleteActivity = (id) => {
        fetch(`http://localhost:3001/api/v1/activities/${id}`, {
            method: 'delete',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            return response
        }).then(data => {
            const activityIndex = this.state.activities.findIndex(x => x.id === id)
            const activityTitle = this.state.activities[activityIndex].title
            const activities = update(this.state.activities, { $splice: [[activityIndex, 1]]})
            this.setState({
                activities: activities,
                notification: `Activity (${id}: ${activityTitle}) deleted!`
            })
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <h1>Activities Board</h1>
                <span className="notification">
                    {this.state.notification}
                </span>
                <ActivityBoard 
                    title="Berlin Activities" 
                    activities={this.state.activities} 
                    editingActivityId={this.state.editingActivityId} 
                    addNewActivity={this.addNewActivity} 
                    updateIdea={this.updateIdea} 
                    resetNotification={this.resetNotification} 
                    enableEditing={this.enableEditing}
                    onDelete={this.deleteActivity}
                    >
                </ActivityBoard>
            </div>
        );
    }
}

export default App;
