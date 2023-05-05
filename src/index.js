import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import weather from './store/reducers/weather'
import {BrowserRouter} from "react-router-dom";
import { createRoot } from 'react-dom/client'

const store = createStore(weather);

createRoot(document.getElementById('root')).render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)

reportWebVitals();
