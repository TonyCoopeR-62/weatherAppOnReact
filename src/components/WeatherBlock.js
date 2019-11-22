import React from 'react'

class WeatherBlock extends React.Component {
    constructor(props) {
        super(props)
            this.state = {
                dataFromApi: {},
                load: true,
                inputValue: 'Moscow',
                count: 0
            }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.requestToAPI()
    }

    componentDidUpdate() {
        this.requestToAPI()
    }

    handleClick() {
        const text = document.getElementById('search').value
        this.setState({
            inputValue: text,
            count: 0
        })     
    }

    requestToAPI() {
        if (this.state.count === 0) {
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + this.state.inputValue + '&appid=8a103589621e12d36e9ffd2d7ee39848')
            .then(responce => responce.json())
            .then(result => {
                this.setState({
                        dataFromApi: result,
                        load: false,
                        count: 1
                    }
                )
            })
        }
    }

    render() {
        return (
            this.state.load ? <h1>Loading...</h1> :
            <div className="main">
                <div className="input">
                    <input type="search" placeholder="Input city..." className="text" id="search"/>
                    <input type="button" className="button" onClick={this.handleClick} value="Show weather"/>
                </div>
                <div className="output">
                    <div className="icon-div"><img src={'http://openweathermap.org/img/w/' + this.state.dataFromApi.weather[0].icon + '.png'} alt="weather" /></div>
                    <div className="city-name">{this.state.dataFromApi.name}</div>
                    <div className="humidity">{this.state.dataFromApi.main.humidity + '%'}</div>
                    <div className="temper">{Math.floor(this.state.dataFromApi.main.temp - 273)	+ '°C'} </div>
                </div>
            </div>
        )
    }
}

export default WeatherBlock