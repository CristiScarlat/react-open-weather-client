import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    headers: {
        "Accept": "application/json"
    }
})

// const getCurrentWeatherByCity = async (city) => {
//     const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric');
//     const data = await res.json();
//     return data;
// }

export const getCurrentWeatherByCity = (city) => {
    return api.get(`/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
}

export const getCurrentWeatherByGeoLocation = (lat, lon) => {
    return api.get(`/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
}

export const getForecastFiveDaysByCity = (city) => {
    return api.get(`/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
}

export const getForecastFiveDaysByGeoLocation = (lat, lon) => {
    return api.get(`/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
}