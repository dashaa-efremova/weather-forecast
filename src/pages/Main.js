import React from 'react';
import Form from "../components/Form";
import {useDispatch, useSelector} from "react-redux";
import {appendCityAction, citySelector} from "../store/reducers/weather";
import CityCard from "../components/CityCard";
import {useEffect} from "react";
import axios from "axios";

const Main = () => {
    const cityData = useSelector(citySelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const citiesFromLocalStorage = JSON.parse(localStorage.getItem('cities') || '[]');
        if (cityData.length === 0) {
            citiesFromLocalStorage.forEach(cityItem => {
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityItem}&appid=f631a4f91371a8f750135f6a8977112a&units=metric`)
                    .then((response) => {
                        dispatch(appendCityAction(response?.data));
                    })
            });
        }
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="fs-1 mt-5 mb-3">Weather App</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Form/>
                </div>
            </div>
            <div className="row">
                {cityData?.map((item, index)=> (
                    <div key={index} className="col-3">
                        <CityCard item={item}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;
