import React from 'react';
import ReactDom from 'react-dom';
import '../css/bootstrap.min.css';
import '../css/custom.min.css';

var Title = function (prop) {
    return (<div className='x_title'>
        <h2>
            Daily active users <small>Sessions</small>
        </h2>
        <ul className='nav navbar-right panel_toolbox'>
            <li>
                <a className="collapse-link"><i className="fa fa-chevron-up" /></a>
            </li>
            <li className="dropdown">
                <a href='index.html'
                    className='dropdown-toggle'
                    data-toggle='dropdown'
                    role='button'
                    data-area-expanded='false'>
                    <i className="fa fa-wrench" />
                </a>
                <ul className="dropdown-menu" role="menu">
                    {
                        [1, 2, 3].map((value, index) => <li key={index}>test</li>)
                    }
                </ul>
            </li>
        </ul>
        <div className='clearfix' />
    </div>);
};

var TimeComponent = function (prop) {
    return (<div className="col-sm-12">
        <div className="temperature">
            <b>{prop.time && prop.time.getDay && prop.time.getDay()}</b>,{prop.time && prop.time.toString && prop.time.toString()}
        </div>
    </div>);
}

var getWeatherId = function (weather) {
    if (weather === 'clear sky')
        return 'clear-day';
    return weather.replace(' ', '-');
}

var WeatherIconComponent = function (prop) {
    return (<div className='col-sm-4'>
        <div className='weather-icon'>
            <canvas height="84" width="84" id={getWeatherId(prop.data.weather[0].description)} />
        </div>
    </div>);
}

var WeatherText = function (prop) {
    return (<div className='col-sm-8'>
        <div className="weather-text">
            <h2>
                {prop.data.name} <br /> <i>{prop.data.weather[0].description}</i>
            </h2>
        </div>
    </div>);
}

function convertFromKtoC(kTemp) {
    return kTemp - 273.15;
}


var WeatherDegree = function ({data}) {
    return (<div className='weather-text pull-right'>
        <h3 className='degrees'>
            {convertFromKtoC(data.main.temp)}
        </h3>
    </div>
    );
}

var ForecastDay = ({dayforecast}) => {
    return (
        <div className="col-sm-2">
            <div className="daily-weather">
                <h2 className="day">Mon</h2>
                <h3 className="degrees">25</h3>
                <canvas id="clear-day" width="32" height="32"></canvas>
                <h5>15 <i>km/h</i></h5>
            </div>
        </div>
    )
}


var Body = (props) => {
    return (
        <div className='x_content'>
            <div className='row'>
                <TimeComponent time={props.time} />
            </div>
            <div className='row'>
                <WeatherIconComponent data={props.data} />
                <WeatherText data={props.data} />
            </div>
            <div className='row'>
                <WeatherDegree data={props.data} />
            </div>
            <div className='clearfix'>
            </div>
            <div className='row weather-days'>
                {
                    props.forecast.list.map((dayData, index) => (<ForecastDay key={index} dayforecast={dayData} />))
                }
            </div>
        </div>
    );
}



var WeatherWidget = (props) => {
    return (<div className='col-md-6 col-sm-6 col-xs-12'>
        <div className='x_panel'>
            <Title />
            <Body data={props.data} time={props.time} forecast={props.forecast} />
        </div>
    </div>);
};
var WeatherWidgetToolbar = ({actions, lastCity}) => {
    return (<div className="row">
        <div className="col-xs-12">
            <label>City Name</label>
            <input onInput={(e) => actions.updateLastCity(e.target.value)} type="text" defaultValue={lastCity} />
            <button onClick={() => actions.addCity(lastCity)}>Add City</button>
            <button onClick={() => actions.removeCity(lastCity) }>Remove City</button>
            <button onClick={actions.removeLastCity}>Remove Last City</button>
            <button onClick={actions.showClock}>Show Clock</button>
            <button>{lastCity}</button>
        </div>
    </div>);
}

var renderClock = function(showClock) {
    if (showClock) {
        return (<Clock />);
    }
    return (<div></div>);
}

var WeatherWidgetList = ({showClock, cities, actions, lastCity}) => {
    return (<div>
    <WeatherWidgetToolbar actions={actions} lastCity={lastCity} />
    {
        cities.filter((city) => !!city.data).map((city,index) => (
            <WeatherWidget key={index} data={city.data} time={city.time} forecast={city.forecast} />
        ))
    }
    {
        renderClock(showClock)   
    }
    </div>);
}


var Clock;

export var render = (weatherData) => {
    // if(weatherData.showClock && !Clock){
    //     import('./clock').then(ClockElement => {
    //         Clock = ClockElement.default;

    //         React.render(<WeatherWidgetList showClock={weatherData.showClock} actions={weatherData.actions} lastCity={weatherData.lastCity} cities={weatherData.cities} />,
    //             document.getElementById('weather-widget')
    //         );
    //     });
    // } else {
        ReactDom.render(<WeatherWidgetList showClock={weatherData.showClock} actions={weatherData.actions} lastCity={weatherData.lastCity} cities={weatherData.cities} />,
            document.getElementById('weather-widget')
        );
    //}
};

