import React, {Component} from 'react';

export default class Activity extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         title: this.props.title,
    //         link: this.props.link,
    //         neighborhood: this.props.neighborhood
    //     }
    // }
    handleClick = () => {
        this.props.onClick(this.props.activity.id)
    }

    handleDelete = () => {
        this.props.onDelete(this.props.activity.id)
    }

    render(){
        return(
            <div className="tile">
                <span className="deleteButton" onClick={this.handleDelete}>
                    x
                </span>

                <a href={this.props.link}>
                    <h3 onClick={this.handleClick} >{this.props.activity.title}</h3>
                </a>
                <p onClick={this.handleClick} >neighborhood: {this.props.activity.neighborhood}</p>
            </div>
        )
    }
}