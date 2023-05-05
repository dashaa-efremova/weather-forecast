import React from 'react'
import axios from "axios";
import {citySelector, setCityAction} from "../store/reducers/weather";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

const CityCard = (item) => {
    const cityData = useSelector(citySelector);
    const dispatch = useDispatch();

    const reloadData = (e, itemName) => {
        e.preventDefault();
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${itemName}&appid=f631a4f91371a8f750135f6a8977112a&units=metric`)
            .then((response) => {
                cityData.forEach(element => {
                    if (element.name === itemName) {
                        let index = cityData.indexOf(element);
                        if (index !== -1) {
                            cityData[index] = response?.data;
                        }
                        dispatch(setCityAction(cityData));
                    }
                });
            })
    }

    const deleteData = (e, id, name) => {
        e.preventDefault();
        const temp_cityData = cityData.filter(item => item.id !== id)
        dispatch(setCityAction(temp_cityData));
        const citiesFromLocalStorage = JSON.parse(localStorage.getItem('cities'));
        const temp_citiesFromLocalStorage = citiesFromLocalStorage.filter(item => item !== name);
        localStorage.setItem('cities', JSON.stringify(temp_citiesFromLocalStorage));
    }

    return (
        <div className="card border-info mb-3">
            <Link to={`/details/${item.item.name}`} className={"text-dark"}>
                <div className="card-header">{item.item.name}</div>
                <div className="card-body">
                    <h5 className="card-title">{Math.round(item.item.main.temp)}°C</h5>
                    <p className="card-text">{item.item.weather[0].description}</p>
                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100 mb-2"
                        onClick={(e) => reloadData(e, item.item.name)}
                    >
                        Refresh
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-danger w-100"
                        onClick={(e) => deleteData(e, item.item.id, item.item.name)}
                    >
                        Delete
                    </button>
                </div>
            </Link>
        </div>
    );
};

export default CityCard;