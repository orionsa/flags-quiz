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
                    <h1 className='ins__header'>Flags And Capitals Of The World Quiz</h1>
                    <div className='ins__text-box'>
                        <p className='ins__sub-title'>Game Rules:</p>
                        <p className='ins__text'>
                            In each question a flag will appear in the center of the screen, you must guess which country the flag belongs to. If you guessed it, another question will appear this time about the capital city of the country. If you have not guessed which country the flag belongs to, you will move on to the next question.
                        </p>
                        <p className='ins__text'>The game has two game modes, timed and untimed. you can toggle between them by pressing the clock icon on the left side of the screen.</p>
                        <p className='ins__sub-title'>Timed Game:</p>
                        <p className='ins__text'>
                        In this game mode you will have only 10 questions. Each question will be assigned to you 10 seconds. If you answered correctly, the score will be determined by the amount of seconds you have left to answer the question. If you do not answer correctly you will not get a score and go to the next question.
                        </p>
                        <p className='ins__sub-title'>Untimed Game:</p>
                        <p className='ins__text'>
                        In this game mode each time a different flag will be displayed, there is no time limit to answer each question and no limited number of questions. Note that this game mode has no score at all.
                        </p>
                    </div>
                    <button className='ins__btn' onClick={()=>{
                        this.setState({cssBox:'instructions-box box-out', 
                                       cssWrapper:'instructions-wrapper wrapper-out'},()=>setTimeout(()=>this.props.toggle(),800))
                    }}>Got It!</button>
                </div>
            </div> 
        )
    }
}