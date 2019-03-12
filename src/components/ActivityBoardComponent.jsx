import React, {Component} from 'react';
import Activity from '../components/ActivityComponent';
import ActivityForm from '../components/ActivityFormComponent';

export default class ActivityBoard extends Component{
    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps){
        console.log("nextProps in activity board component")
        // console.log(nextProps.activities[0])
    }

    render(){
        let activities = this.props.activities.map((act) => {
            if (this.props.editingActivityId === act.id) {
                return <ActivityForm key={act.id} activity={act} updateIdea={this.props.updateIdea} resetNotification={this.props.resetNotification} />
            } else {
                return <Activity key={act.id} activity={act} onClick={this.props.enableEditing} onDelete={this.props.onDelete} />
            }
        })
        
        return(
            <div>
                <h2>{this.props.title}</h2>
                <section>
                    <button className="newActivityButton" onClick={this.props.addNewActivity}>
                        New Activity
                    </button>
                    </section>
                <section>
                    {activities}
                </section>
            </div>
        )
    }
}
