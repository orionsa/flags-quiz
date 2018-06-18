import React, { Component } from 'react';
import countries from '../static/data/allCountries.json';
import List from './List';
import Timer from './Timer';
import TopBar from './TopBar';
import Instructions from './Instructions';
import Score from './Score';
import gameOver from './GameOver';

let countDown
let sec
export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            capitals: [],
            urls: [],
            currentCountry: {},
            countryOrCapital: '',
            sec: 10,
            askedCountries: [],
            round: 0,
            score: 0,
            gameOver: false,
            timed: true,
            instructionSwitch: false
        }
        this.CountryCapitalSwitch = this.CountryCapitalSwitch.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.getRandomCountry = this.getRandomCountry.bind(this);
        this.timer = this.timer.bind(this);
        this.newGame = this.newGame.bind(this);
        this.timeSwitch = this.timeSwitch.bind(this);
        this.instructionSwitch = this.instructionSwitch.bind(this);
    }
    componentWillMount() {
        let allCountries = [];
        let allCapitals = [];
        let allUrls=[]
        for (let i = 0; i < Object.keys(countries).length; i++) {//Fetch data from json file 
            //console.log('Object.keys(countries)[i] ', Object.keys(countries)[i])
            allCountries.push(Object.keys(countries)[i]);
            //console.log('Object.values(countries)[i].capital ', Object.values(countries)[i].capital)
            allCapitals.push(Object.values(countries)[i].capital);
            allUrls.push(`http://flags.fmcdn.net/data/flags/w580/${Object.values(countries)[i].code}.png`)
        }
        this.setState({ countries: allCountries, capitals: allCapitals, urls: allUrls })
        this.timer()
    }
    getRandomCountry() {//Sets random country according to game mode
        if (this.state.timed) {//Execute only on timed game mode 
            clearInterval(countDown)
            //console.log('get random country check', Object.keys(countries).length);
            let ran = Math.floor(Math.random() * (Object.keys(countries).length));
            console.log('ran is: ', Object.keys(countries)[ran])
            console.log('this.state.askedCountries.includes(ran)', this.state.askedCountries.includes(ran))
            if (this.state.askedCountries.includes(ran)) this.getRandomCountry() // Make sure each country is picked only once in one game
            else
                this.setState({
                    countryOrCapital: 'country',
                    askedCountries: [...this.state.askedCountries, ran],
                    currentCountry: {
                        country: Object.keys(countries)[ran],
                        code: Object.values(countries)[ran].code,
                        capital: Object.values(countries)[ran].capital,
                        sec: 10,
                        round: this.state.round++,
                        flag: `http://flags.fmcdn.net/data/flags/w580/${Object.values(countries)[ran].code}.png`
                    }
                }, () => console.log('this.state.currentCountry is: ', this.state))
        }
        else { //Execute only on untimed game mode
            let ran = Math.floor(Math.random() * (Object.keys(countries).length )) ;
            console.log('ran is: ', Object.keys(countries)[ran]);
            //console.log('this.state.askedCountries.length <= this.state.countries.length', this.state.askedCountries.length , this.state.countries.length)
            //while (this.state.askedCountries.length <= this.state.countries.length){
            if (this.state.askedCountries.length < this.state.countries.length){// Prevent infinite loop after all the flags were asked
                if (this.state.askedCountries.includes(ran)) this.getRandomCountry() //Make sure each country is picked only once in one game
                else
                    this.setState({
                        countryOrCapital: 'country',
                        askedCountries: [...this.state.askedCountries, ran],
                        currentCountry: {
                            country: Object.keys(countries)[ran],
                            code: Object.values(countries)[ran].code,
                            capital: Object.values(countries)[ran].capital,
                            flag: `http://flags.fmcdn.net/data/flags/w580/${Object.values(countries)[ran].code}.png`
                        }
                    })
                }
            else this.setState({gameOver: true});
        }
        //}    
    }
    timer() {//Starts the timer, only works on timed game mode
        console.log('TIMER ', this.state.round)
        if (this.state.round < 3) {
            this.getRandomCountry()
            sec = 10;
            countDown = setInterval(() => {
                this.setState({ sec: this.state.sec - 1 }, () => { 
                    if (this.state.sec == 0) {
                        console.log('timer is over')
                        this.nextQuestion()
                    }
                })
            }, 1000)
        }
        else this.setState({ gameOver: true })
    }
    CountryCapitalSwitch() {//switch between country and capital questions
        console.log('from country to capital check')
        console.log('this.state.sec', this.state.countryOrCapital)
        //this.setState({countryOrCapital: 'capital'})
        if (this.state.timed) {//Execute only on timed game mode, update the current second to the score count and reset the timer
            if (this.state.countryOrCapital == 'country')
                this.setState({ countryOrCapital: 'capital', score: this.state.score + this.state.sec })
            //if (this.state.countryOrCapital == 'capital')
            else
                this.setState({ score: this.state.score + this.state.sec, sec: 10 }, () => this.timer())
        }
        else {//Execute only on untimed game mode
            console.log('CHECK CHECK', this.state.countryOrCapital)
            if (this.state.countryOrCapital == 'country')
                {console.log('check1')
                this.setState({ countryOrCapital: 'capital' })}
            //if (this.state.countryOrCapital == 'capital') 
            else
                {
                    console.log('check2')
                    this.getRandomCountry()}
        }
    }
    nextQuestion() {
        if (this.state.timed) {
            this.setState({ sec: 10 }, () => {
                clearInterval(countDown)
                this.timer()
            })
        }
        else {
            console.log('next question check')
            this.getRandomCountry()}
    }
    newGame() {
        console.log('new game');
        clearInterval(countDown);
        if (this.state.timed)
            this.setState({
                sec: 10,
                askedCountries: [],
                round: 0,
                score: 0,
                gameOver: false
            }, () => this.timer())
        else this.setState({
            askedCountries: [],
            gameOver: false
        }, () => this.getRandomCountry())
    }
    timeSwitch() {//Switch game modes and start a new game with the relevent mode
        console.log('timeSwitch Check');
        if (this.state.timed) {
            clearInterval(countDown);
            this.setState({ timed: false }, () => this.newGame())
        }
        else this.setState({ timed: true }, () => this.newGame())
    }
    buttonText(){
        if (!this.state.timed) return <div className='untimed'></div>
    }
    instructionSwitch(){
        if (this.state.timed){
            if (this.state.instructionSwitch) 
                this.setState({instructionSwitch: !this.state.instructionSwitch},()=>this.newGame());
            else{
                clearInterval(countDown);
                this.setState({instructionSwitch: !this.state.instructionSwitch})
            }
        }
        else
            this.setState({instructionSwitch: !this.state.instructionSwitch})
    }
    render() {
        //console.log('countries:', countries, Object.values(countries))
        return (
            <div className="app">
                <TopBar flags={this.state.urls} toggle={this.instructionSwitch}/>
                {this.state.instructionSwitch && <Instructions toggle={this.instructionSwitch}/>}
                <div className='main-container'>
                    <div className='flag-button-container'>
                        <button className='button timer-btn' onClick={this.timeSwitch}>{this.buttonText()}</button>
                        {/* <div className='flag' style={{ backgroundImage: `url(${this.state.currentCountry.flag})` }}></div> */}
                        {
                            !this.state.gameOver 
                            ?<div className='flag' style={{ backgroundImage: `url(${this.state.currentCountry.flag})` }}></div> //displyed when game over state is false
                            :<div className='flag none' style={{ backgroundImage: `url(${this.state.currentCountry.flag})` }}></div>// adds css visability hidden to the flag
                        }
                        {this.state.timed && !this.state.gameOver && <Timer sec={this.state.sec}/>}
                        <button className='button' onClick={this.newGame}>New Game</button>
                    </div>
                    {!this.state.gameOver && this.state.countryOrCapital == 'country' && <List correct={this.state.currentCountry.country}
                        answers={this.state.countries}
                        CountryCapitalSwitch={this.CountryCapitalSwitch}
                        newQuestion={this.nextQuestion} />}
                    {!this.state.gameOver && this.state.countryOrCapital == 'capital' && <List correct={this.state.currentCountry.capital}
                        answers={this.state.capitals}
                        newQuestion={this.nextQuestion}
                        CountryCapitalSwitch={this.CountryCapitalSwitch} />}
                    {!this.state.gameOver && this.state.timed && <Score firstParam={this.state.round} secondParam={this.state.score}/>}
        {/*this.state.gameOver && <GameOver />*/}
                </div>
            </div>
        )
    }
}