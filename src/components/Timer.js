import React,{Component} from 'react'

export default class Timer extends Component {
    constructor(props){
        super(props)
    }
    componentWillReceiveProps(nextProps){
        console.log('component will receive props check')
    }
    render(){
        return(
            <div>
                this is the timer componenet
            </div>
        )
    }
}