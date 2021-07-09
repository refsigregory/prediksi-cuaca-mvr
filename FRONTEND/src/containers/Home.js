import React from 'react';
import { format } from 'date-fns';
import { forecastApi } from "../api";
import { degToCompass, showImage } from "../utils/convertUtils";
import '../style.css';
import icon1 from '../images/icons/icon-1.svg';
import icon2 from '../images/icons/icon-2.svg';
import icon3 from '../images/icons/icon-3.svg';
import icon4 from '../images/icons/icon-4.svg';
import icon5 from '../images/icons/icon-5.svg';
import icon6 from '../images/icons/icon-6.svg';
import icon7 from '../images/icons/icon-7.svg';
import icon8 from '../images/icons/icon-8.svg';
import icon9 from '../images/icons/icon-9.svg';
import icon10 from '../images/icons/icon-10.svg';
import icon11 from '../images/icons/icon-11.svg';
import icon12 from '../images/icons/icon-12.svg';
import icon13 from '../images/icons/icon-13.svg';
import icon14 from '../images/icons/icon-14.svg';
import umberella from '../images/icon-umberella.png';
import wind from '../images/icon-wind.png';
import compass from '../images/icon-compass.png';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "Manado",
            position: {lat: 1.5408109, long: 124.6443997},
            current: [],
            daily: []
        };
    }

    componentDidMount()
    {
        try {
            const resp = forecastApi(this.state.position);
            console.log(resp.then((x)=>console.log(x.data)));
            resp.then((x)=>
                this.setState({current: x.data.current, weather: x.data.current.weather, daily: x.data.daily})
            );
            
            /* if (resp.data && resp.data.code === 200) {
                console.log(resp.data)
            } */
        } catch (err) {
            console.log(err && err.response ? err.response.message : "Unknown error");
        }
    }

    render() {
        let dailylist;
        

        dailylist = this.state.daily.map((item,idx) =>
        {
            return (
                <div className="forecast" key={idx}>
                    <div className="forecast-header">
                        <div className="day">{format(new Date(item.dt*1000), 'EEEE')}</div>
                    </div> 
                    <div className="forecast-content">
                        <div className="forecast-icon">
                            <img src={showImage(item.weather[0].main)} alt="" width="48" />
                        </div>
                        <div className="degree">{Math.floor(item.temp.min)}<sup>o</sup>C</div>
                        <small>{Math.floor(item.temp.max)}<sup>o</sup></small>
                    </div>
                </div>
            );
        });

        console.log(this.state.weather);

        return ( 
                <div className="site-content">

                    <div className="hero">
                        <center><h1 >Aplikasi Prediksi Cuaca di Kota Manado menggunakan Algoritma Multiple Regression</h1></center>
                    </div>
                    <div className="forecast-table">
                        <div className="container">
                            <div className="forecast-container">
                                <div className="today forecast">
                                    <div className="forecast-header">
                                        <div className="day">{format(new Date(), 'EEEE')}</div>
                                        <div className="date">{format(new Date(), 'E d MMM')}</div>
                                    </div> 
                                    <div className="forecast-content">
                                        <div className="location">{this.state.city}</div>
                                        <div className="degree">
                                            <div className="num">{Math.floor(this.state.current.temp)}<sup>o</sup>C</div>
                                            <div className="forecast-icon">
                                                <img src={showImage(this.state.weather)} alt="" width="90" />
                                            </div>	
                                        </div>
                                        <span><img src={umberella} alt="" />{this.state.current.humidity}%</span>
                                        <span><img src={wind} alt="" />{this.state.current.wind_speed}km/h</span>
                                        <span><img src={compass} alt="" />{degToCompass(this.state.current.wind_deg)}</span>
                                    </div>
                                </div>
                                {
                                    dailylist
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>

        );
    }
}

export default Home;
