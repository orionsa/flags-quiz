import React, { Component } from 'react'

export default class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            answers: [],
            CSSAnswer: 'answer',
            CSSRevealRight: 'answer',
            correctAnswerPlace: 0
        }
        this.checkAnswer = this.checkAnswer.bind(this)
    }
    componentWillMount() {
        this.renderAnswers(this.props)
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.correct !== nextProps.correct) this.renderAnswers(nextProps)
    }
    renderAnswers(props) {
        console.log('RENDER CHECK', props)
        let answers = [];
        let i = 0
        while (i < 4) {
            let ran = Math.floor(Math.random() * props.answers.length - 1) + 1;
            if (!answers.includes(props.answers[ran]) & props.answers[ran] !== props.correct) {
                answers.push(props.answers[ran]);
                i++
            }
        }
        //console.log('answers before is ', answers)
        let ran = Math.floor(Math.random() * answers.length - 1) + 1
        //console.log('rann is ', ran)
        answers.splice(ran, 1, props.correct)
        console.log('answers is ', answers)
        this.setState({ answers: answers, CSSRevealRight: 'answer', CSSAnswer: 'answer', correctAnswerPlace: ran })
    }
    checkAnswer(event) {
        //console.log('checkAnswer ', item)
        if (event.target.innerText == this.props.correct) {
            //console.log('right', event.target.className)
            event.target.className = 'right'
            // event.target.className('answer right')
            // let countryCapitalSwitch = this.props.CountryCapitalSwitch
            setTimeout(() => {
                this.props.CountryCapitalSwitch()
            }
                , 500);
        }
         else if (event.target.innerText !== this.props.correct)
        {
                console.log('wrong', event.target.innerText)
                //event.target.className='wrong'
                this.setState({CSSRevealRight: 'right'})
                event.target.className= 'wrong'
                let e=event.target //Catch the event target in order to reset its CSS 
                setTimeout(()=>{
                    console.log('TIME FOR NEW QUESTION',e)
                    e.className='answer'
                    this.props.newQuestion()
                },500,e)    
        }
    }
    render() {
        return (
            <ul className='answers-container'>
                {this.state.answers.map((item, i) => {
                    return <li className={this.state.correctAnswerPlace === i ? this.state.CSSRevealRight : this.state.CSSAnswer} key={item} onClick={(event) => {
                        this.checkAnswer(event)
                    }}>{item}</li>
                })}
            </ul>

        )
    }
}