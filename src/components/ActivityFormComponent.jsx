import React, {Component} from 'react';
const util = require('util')


export default class ActivityForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: this.props.activity.title,
            link: this.props.activity.link,
            neighborhood: this.props.activity.neighborhood
        }
    }

    handleInput = (event) => {
        this.props.resetNotification()
        this.setState({
            [event.target.name]: event.target.value,
        })
      }

      handleBlur = (event) => {
        const activity = {
            title: this.state.title,
            link: this.state.link,
            neighborhood: this.state.neighborhood
        }

        event.persist();
        // console.log("event: " + event)
        fetch(`http://localhost:3001/api/v1/activities/${this.props.activity.id}`, 
            {
                method: 'put',
                mode: 'cors',
                redirect: 'follow',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    activity: activity
                })
        }).then(response => {
            console.log('inside response from post')
            // console.log(response.json())
            return response.json()
        }).then(data => {
            this.props.updateIdea({activity: data})
            console.log("updated activity")
            console.log('response data: ' + util.inspect(data))
            // console.log("new activity: " + util.inspect(data,false,null,true))
            // console.log("id: " + data.id)
            // this.setState({
            //   activities: [data, ...this.state.activities], 
            //   editingActivityId: data.id
            // }, () => {
            //   // console.log(this.state.activities);
            //   console.log("activityid: " + this.state.editingActivityId);
            //  }
            // )
        }).catch(error => console.log(error))
    }


    render(){
        return(
            <div className="tile">
            <form onBlur={this.handleBlur} autocomplete="off" >
                <label>Activity:
                <input className="input" type="text" name="title" placeholder="Activity title" value={this.state.title} onChange={this.handleInput}></input>
                </label>
                <label>Neighborhood:
                <input className="input" type="text" name="neighborhood" placeholder="Neighborhood" value={this.state.neighborhood} onChange={this.handleInput} ></input>
                </label>
                <label>Link:
                <input className="input" type="text" name="link" placeholder="Link" value={this.state.link} onChange={this.handleInput} ></input>
                </label>
            </form>
            </div>
        )
    }
}