import { useEffect, useState, useContext } from 'react';
import { getCurrentWeatherByCity, getCurrentWeatherByGeoLocation } from '../services/api';
import { getGeoLocation } from '../services/geolocation';
import { Ctx } from '../context/store';

const Home = () => {

    const [weatherData, setWeatherData] = useState();

    const { city, setLocation } = useContext(Ctx);

    useEffect(() => {
        async function fetchData() {
            try {
                let res = null;
                if (city && city !== "") {
                    res = await getCurrentWeatherByCity(city);
                }
                else {
                    const position = await getGeoLocation();
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    res = await getCurrentWeatherByGeoLocation(latitude, longitude);
                    sessionStorage.setItem('location', JSON.stringify({
                        lat: latitude,
                        long: longitude
                    }));
                    setLocation({
                        lat: latitude,
                        long: longitude
                    })
                }
                if (res.status === 200) {
                    setWeatherData(res.data);
                }
                else {
                    alert("Something went wrong, could not get data from api, please try again later.")
                }
            }
            catch (error) {
                console.log(error);
                if (error?.response?.data) {
                    alert(error?.response?.data.message)
                }
            }
        }
        fetchData();
        // getGeoLocation()
        // .then(position => {
        //     const latitude = position.coords.latitude;
        //     const longitude = position.coords.longitude;
        //     getCurrentWeatherByGeoLocation(latitude, longitude)
        //     .then(data => console.log(data))
        //     .catch(error => console.log(error))
        // })
        // .catch(error => {
        //     console.log(error)
        // })

        // getCurrentWeatherByCity('Bucharest')
        // .then(res => {
        //     console.log(res)
        // })
        // .catch(error => {
        //     console.log(error)
        // })
    }, [city])


    return (
        <main>
            <h1>{weatherData?.name}</h1>
            <div className="home-weather-icon-container">
                <img src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`} alt="..." />
                <span>{weatherData?.weather[0].description}</span>
            </div>
            <div className="home-weather-data-container">
                <img src="images/icons8-temperature-outside-96.png" alt="temperature" />
                <div>
                    <p>Temperature</p>
                    <p>{`${weatherData?.main?.temp} `}&#8451;</p>
                </div>
            </div>
            <div className="home-weather-data-container">
                <img src="images/icons8-wet-96.png" alt="humidity" />
                <div>
                    <p>Humidity</p>
                    <p>{`${weatherData?.main?.humidity} %`}</p>
                </div>
            </div>
            <div className="home-weather-data-container">
                <img src="images/icons8-atmospheric-pressure-96.png" alt="pressure" />
                <div>
                    <p>Pressure</p>
                    <p>{`${weatherData?.main?.pressure} hPa`}</p>
                </div>
            </div>
            <div className="home-weather-data-container">
                <img src="images/icons8-wind-96.png" alt="wind" />
                <div>
                    <p>Wind</p>
                    <p>{`${weatherData?.wind?.speed} m/s`}</p>
                </div>
            </div>
        </main>
    )
}

export default Home;