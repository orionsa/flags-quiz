import React, { Component } from 'react';
import countries from '../static/data/countries.json'
import List from './List'
import Timer from './Timer'

let countDown
let sec 
export default class App extends Component {
    constructor(props){
        super(props)
        this.state={
            countries:[],
            capitals:[],
            currentCountry:{},
            countryOrCapital : '',
            sec: 10,
            askedCountries:[],
            round: 0,
            score : 0,
            gameOver : false,
            timed : true
        }
        this.CountryCapitalSwitch = this.CountryCapitalSwitch.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.getRandomCountry = this.getRandomCountry.bind(this);
        this.timer = this.timer.bind(this);
        this.newGame = this.newGame.bind(this);
        this.timeSwitch = this.timeSwitch.bind(this);
    }
    componentWillMount(){
        let allCountries = [];
        let allCapitals = [];
        for (let i=0; i<Object.keys(countries).length; i++){
            //console.log('Object.keys(countries)[i] ', Object.keys(countries)[i])
            allCountries.push(Object.keys(countries)[i]);
            //console.log('Object.values(countries)[i].capital ', Object.values(countries)[i].capital)
            allCapitals.push(Object.values(countries)[i].capital);
        }
        this.setState({countries: allCountries , capitals: allCapitals})
        this.timer()
    }
    getRandomCountry(){
        // let sec = 10;
        // let countDown = setInterval(()=>{
        //     console.log('sec is ', sec)
        //     sec--
        //     if (sec == 0) {
        //         console.log('timer is over')
        //         clearInterval(countDown)
        //     }
        // },1000)
        clearInterval(countDown)
        //console.log('get random country check', Object.keys(countries).length);
        let ran= Math.floor(Math.random()*(Object.keys(countries).length-1))+1;
        console.log('ran is: ', Object.keys(countries)[ran])
        console.log('this.state.askedCountries.includes(ran)', this.state.askedCountries.includes(ran))
        if (this.state.askedCountries.includes(ran)) this.getRandomCountry() // make sure same country picked twice in one game
        else
        this.setState({ countryOrCapital : 'country',
                        askedCountries : [...this.state.askedCountries, ran],
                        currentCountry:{ country: Object.keys(countries)[ran],
                                        code: Object.values(countries)[ran].code,
                                        capital: Object.values(countries)[ran].capital,
                                        sec: 10,
                                        round : this.state.round++,
                                        flag: `http://flags.fmcdn.net/data/flags/w580/${Object.values(countries)[ran].code}.png`}},()=>console.log('this.state.currentCountry is: ',this.state))
        
    }
    timer(){
        console.log('TIMER ', this.state.round)
        if (this.state.round < 3){
        //console.log('timer check',typeof(countDown))
        this.getRandomCountry()
        sec = 10;
        countDown = setInterval(()=>{
            // console.log('this.state.sec is ', this.state.sec)
            // console.log('sec is ', sec)
            // sec--
            // if (sec == 0) {
            //     console.log('timer is over')
            //     clearInterval(countDown)
            //     this.timer()
            // }
            this.setState({sec: this.state.sec-1},()=>{ //A TRY TO CHANGE SECONDS WITH THE STATE
                if (this.state.sec == 0) {
                console.log('timer is over')
                // this.setState({sec : 10}, ()=>{
                //     clearInterval(countDown)
                //     this.timer()
                // }) 
                this.nextQuestion()  
            }
            })
        },1000)
        //setInterval(()=>this.getRandomCountry(),10000)
        }
        else this.setState({gameOver: true})
    }
    CountryCapitalSwitch(){//switch between country and capital questions and add the current second to the score
       console.log('from country to capital check') 
       console.log('this.state.sec', this.state.sec)
       //this.setState({countryOrCapital: 'capital'})
       if (this.state.countryOrCapital == 'country')
            this.setState({countryOrCapital: 'capital',score: this.state.score + this.state.sec})
       if (this.state.countryOrCapital == 'capital')
            this.setState({score: this.state.score + this.state.sec ,sec:10},()=> this.timer())
    }
    nextQuestion(){
        console.log('next question check');
        this.setState({sec: 10},()=>{
            clearInterval(countDown)
            this.timer()  
        }) 
    }
    newGame(){
        console.log('new game');
        clearInterval(countDown);
        this.setState({ sec : 10,
                        askedCountries:[],
                        round: 0,
                        score : 0,
                        gameOver : false},()=>this.timer())
    }
    timeSwitch(){
        console.log('timeSwitch Check');
        this.setState({timed: !this.state.timed})
    }
    render(){
        //console.log('countries:', countries, Object.values(countries))
        return (
        <div className="app">
            <button onClick={this.timeSwitch}>Timed</button>
            <br/>
            <img className='flag' src={this.state.currentCountry.flag}/>
            <br/>
            {!this.state.gameOver && this.state.countryOrCapital == 'country' && <List correct={this.state.currentCountry.country} 
                                                               answers={this.state.countries} 
                                                               CountryCapitalSwitch={this.CountryCapitalSwitch} 
                                                               newQuestion={this.nextQuestion}/>}
            <br/>   
            {!this.state.gameOver && this.state.countryOrCapital == 'capital' && <List correct={this.state.currentCountry.capital} 
                                                               answers={this.state.capitals} 
                                                               newQuestion={this.nextQuestion} 
                                                               CountryCapitalSwitch={this.CountryCapitalSwitch}/> }    
            <br />
            {
            this.state.timed &&
            <div>
                <progress value={10-this.state.sec} max="10"></progress>
                <br/>
                round: {this.state.round}
                <br/>
                score: {this.state.score}
                <br/>
            </div>
            }
            <button onClick={this.newGame}>New Game</button>
        </div>
        )
    }
}