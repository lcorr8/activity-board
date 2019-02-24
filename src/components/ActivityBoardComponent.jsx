import React, {Component} from 'react';
import Activity from '../components/ActivityComponent';

export default class ActivityBoard extends Component{

    render(){
        let activities = this.props.activities.map((act) => {
            return <Activity key={act.id} title={act.title} neighborhood={act.hood} link={act.link} />
        })
        
        return(
            <div>
                <h2>{this.props.title}</h2>
                <section>
                    {activities}
                </section>
            </div>
        )
    }
}