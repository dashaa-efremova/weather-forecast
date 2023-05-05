import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { Button } from 'react-bootstrap';
import axios from "axios";
import {appendCityAction} from "../store/reducers/weather";

const Form = () => {
    const [city, setCity] = useState('');
    const searchIsDisabled = city === '';
    const dispatch = useDispatch();

    const getWeather = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f631a4f91371a8f750135f6a8977112a&units=metric`)
            .then((response) => {
                if(response) {
                    const cities = JSON.parse(localStorage.getItem('cities') || '[]');
                    if (!cities.includes(response?.data?.name)) {
                        cities.push(response?.data?.name);
                        localStorage.setItem('cities', JSON.stringify(cities));
                        dispatch(appendCityAction(response?.data));
                    } else {
                        alert('This city is already exist.');
                    }
                }
            })
            .catch((error) => {
                if(error.message === 'Request failed with status code 404'){
                    alert(`I could not find the city "${city}". Please check if it was spelled correctly or enter another one.`);
                }
            })
            .finally(() => {
                setCity('')
            });
    }

    const handleKeyPress = (event) => {
        if(event.key === "Enter") {
            event.preventDefault();
            if(city !== '') {
                getWeather();
            } else {
                return;
            }
        }
    };

    return (
        <form className="input-group mb-3">
            <input
                type='text'
                name='city'
                value={city}
                onChange={(e)=> setCity(e.target.value)}
                placeholder='Enter the city'
                className="form-control"
                onKeyPress={handleKeyPress}
            />
            <Button
                variant="primary"
                disabled={searchIsDisabled}
                size="lg"
                onClick={() => getWeather()}
            >
                Find
            </Button>
        </form>
    );
};

export default Form;