import React,{Component} from 'react'

export default class Instructions extends Component{
    constructor(props){
        super(props)
        this.state= {
            cssWrapper: 'instructions-wrapper',
            cssBox:'instructions-box'
        }
    }
    render(){
        return(
            <div className={this.state.cssWrapper}>
                <div className={this.state.cssBox}>
                    <h1>Instructions</h1>
                    <button onClick={()=>{
                        this.setState({cssBox:'instructions-box box-out', 
                                       cssWrapper:'instructions-wrapper wrapper-out'},()=>setTimeout(()=>this.props.toggle(),800))
                    }}>close</button>
                </div>
            </div> 
        )
    }
}