import React, { Component } from 'react'

export default class List extends Component {
    constructor(props) {
        super(props)
        this.state = { answers: [],
                       //clicked: false,
                       //CSSAnswer: 'answers' 
                    }
        this.checkAnswer = this.checkAnswer.bind(this)
    }
    componentWillMount() {
        // let answers = [];
        // let i = 0
        // while (i < 4) {
        //     let ran = Math.floor(Math.random() * this.props.answers.length - 1) + 1;
        //     if (!answers.includes(this.props.answers[ran]) & this.props.answers[ran] !== this.props.correct) {
        //         answers.push(this.props.answers[ran]);
        //         i++
        //     }
        // }
        // answers.splice(Math.floor(Math.random() * answers.length - 1) + 1, 1, this.props.correct)
        // console.log('answers is ', answers)
        // this.setState({ answers: answers })
        this.renderAnswers(this.props)
    }
     componentWillReceiveProps(nextProps){
        //console.log('component will recieve props check',(this.props.correct === nextProps.correct))
        //console.log('this.props is', this.props, this.state, nextProps)
        if (this.props.correct !== nextProps.correct) this.renderAnswers(nextProps)
     }
    //shouldComponentUpdate(nextProps){
       // console.log('should component update check', nextProps.correct, this.props.correct)
       // console.log('bool',  !(this.props.correct === nextProps.correct))
       // if (!(this.props.correct === nextProps.correct)) this.renderAnswers()
       // return !(this.props.correct === nextProps.correct)
    //}
    // renderAnswers(){
    //     console.log('RENDER CHECK')
    //     let answers = [];
    //     let i = 0
    //     while (i < 4) {
    //         let ran = Math.floor(Math.random() * this.props.answers.length - 1) + 1;
    //         if (!answers.includes(this.props.answers[ran]) & this.props.answers[ran] !== this.props.correct) {
    //             answers.push(this.props.answers[ran]);
    //             i++
    //         }
    //     }
    //     console.log('answers before is ', answers)
    //     let rann = Math.floor(Math.random() * answers.length - 1) + 1
    //     console.log('rann is ', rann)
    //     answers.splice(rann, 1, this.props.correct)
    //     console.log('answers is ', answers)
    //     this.setState({ answers: answers })
    // }
    renderAnswers(props){
        console.log('RENDER CHECK',props)
        let answers = [];
        let i = 0
        while (i < 4) {
            let ran = Math.floor(Math.random() * props.answers.length - 1) + 1;
            if (!answers.includes(props.answers[ran]) & props.answers[ran] !== props.correct) {
                answers.push(props.answers[ran]);
                i++
            }
        }
        console.log('answers before is ', answers)
        let rann = Math.floor(Math.random() * answers.length - 1) + 1
        console.log('rann is ', rann)
        answers.splice(rann, 1, props.correct)
        console.log('answers is ', answers)
        this.setState({ answers: answers })
    }
    checkAnswer(event) {
       //console.log('checkAnswer ', item)
        if(event.target.innerText == this.props.correct)
            {console.log('right', event.target.innerText)
            this.props.CountryCapitalSwitch()}
        else
            {console.log('wrong', event.target.innerText)
            this.props.newQuestion()}
        //this.setState({clicked: true})
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.answers.map(item => {
                        return <li className="answers" key={item} onClick={(event) => {
                            this.checkAnswer(event)
                        }}>{item}</li>
                    })}
                </ul>
            </div>
        )
    }
}