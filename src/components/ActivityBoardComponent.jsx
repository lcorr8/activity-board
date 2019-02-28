import React, {Component} from 'react';
import Activity from '../components/ActivityComponent';
import ActivityForm from '../components/ActivityFormComponent';

export default class ActivityBoard extends Component{
    constructor(props){
        super(props);
    }
    
    
    render(){
        let activities = this.props.activities.map((act) => {
            if (this.props.editingActivityId === act.id) {
                return <Activity key={act.id} title={act.title} neighborhood={act.hood} link={act.link}activity={act} />
            } else {
                return <ActivityForm key={act.id} activity={act} updateIdea={this.props.updateIdea}/>
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