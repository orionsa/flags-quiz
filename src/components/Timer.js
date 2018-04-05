import React, { Component } from 'react'

export default class Timer extends Component {
    constructor(props) {
        super(props)
    }
    clock() {
        console.log(this.props.sec)
        switch (this.props.sec) {
            case 10: return 'pie ten'
            case 9: return 'pie nine'
            case 8: return 'pie eight' 
            case 7: return 'pie seven' 
            case 6: return 'pie six' 
            case 5: return 'pie five' 
            case 4: return 'pie four' 
            case 3: return 'pie three' 
            case 2: return 'pie two' 
            case 1: return 'pie one' 
            case 0: return 'pie zero' 
        }
    }
    render() {
        return (
            <div className={this.clock()}>
            </div>
        )
    }
}