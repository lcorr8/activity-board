import React, {Component} from 'react';

export default class Activity extends Component{
    render(){
        return(
            <div className="tile">
                <a href={this.props.link}>
                    <h3>{this.props.title}</h3>
                </a>
                <p>neighborhood: {this.props.neighborhood}</p>
            </div>
        )
    }
}