import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Details = () => {
    const { cityName } = useParams();
    const [weatherList, setWeatherList] = useState([]);
    const [weatherTime, setWeatherTime] = useState([]);
    const [weatherTemp, setWeatherTemp] = useState([]);

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f631a4f91371a8f750135f6a8977112a&units=metric`)
            .then((response) => {
                if(response) {
                    setWeatherList(response.data.list);
                }
            })
    }, []);

    useEffect(() => {
        weatherList.forEach((element)=>{
            setWeatherTime(oldArray => [...oldArray, unixToDateTime(element?.dt)]);
            setWeatherTemp(oldArray => [...oldArray, element?.main?.temp]);
        })
    }, [weatherList]);

    const unixToDateTime = (timestamp) => {
        let date = new Date(timestamp * 1000);
        let hours = date.getHours();
        let minutes = "00";
        return hours + ':' + minutes;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="fs-1 mt-5 mb-3">Details about weather in {cityName}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Line
                        data={{
                            labels: weatherTime,
                            datasets: [{label: `Weather in ${cityName}`, data: weatherTemp,}]
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Details;
