import { useEffect, useContext, useState } from "react";
import { Ctx } from "../context/store";
import { getForecastFiveDaysByCity, getForecastFiveDaysByGeoLocation } from "../services/api";
import {
    Chart as ChartJS,
    CategoryScale,
    registerables
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Accordion from "../components/accordion/accordion";



const Forecast = () => {
    const [forecastData, setForecastData] = useState();
    const [tempGraphData, setTempGraphData] = useState();
    const { city, location } = useContext(Ctx);

    ChartJS.register(...registerables);

    const filterForecastDataByDay = () => {
        const dataByDay = {};
        forecastData.list.forEach(item => {
            const day = item.dt_txt.split(" ")[0];
            if (dataByDay[day]) {
                dataByDay[day].push(item);
            }
            else {
                dataByDay[day] = [];
            }
        })
        return dataByDay;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                let res = null;
                if (city && city !== "") {
                    res = await getForecastFiveDaysByCity(city);
                }
                else {
                    res = await getForecastFiveDaysByGeoLocation(location.lat, location.long);
                }
                if (res.status === 200) {
                    setForecastData(res.data);
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
    }, [city])

    useEffect(() => {
        if (forecastData) {
            const forecastDataByDay = filterForecastDataByDay()

            const tempDataArray = Object.keys(forecastDataByDay).map(day => {
                return {
                    chart: {
                        labels: forecastDataByDay[day].map(item => {
                            const hour = item.dt_txt.split(" ")[1];
                            return hour.slice(0, 5);
                        }),
                        datasets: [
                            {
                                label: `${day} - temperature forecast`,
                                data: forecastDataByDay[day].map(item => item.main.temp),
                                borderColor: 'rgb(44 125 225)',
                                backgroundColor: 'rgb(44 125 225)',
                            }
                        ]
                    },
                    details: {
                        weather: forecastDataByDay[day].map(item => ({
                            ...item.main,
                            ...item.weather[0],
                            hour: item.dt_txt.split(" ")[1].slice(0, 5)
                        }))
                    }
                }
            })
            setTempGraphData(tempDataArray);
        }
    }, [forecastData])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: '5 days temperature forecast',
            },
        },
    };

    console.log(tempGraphData)

    return (
        <main>
            <h1>{forecastData?.city?.name}</h1>
            <div className="forecast-charts-wrapper">
                {
                    tempGraphData && tempGraphData.map(dayData => (
                        <div className="forecast-chart-container" key={dayData.chart.datasets[0].label}>
                            {/* <hr style={{ margin: '1rem 0' }} /> */}
                            <Line options={options} data={dayData.chart} />
                            <Accordion title="Details" className="forecast-accordion" defaultState={'close'}>
                                <div className="forecast-accordion-details-container">
                                    {dayData?.details?.weather.map(item => (
                                        <div className="forecast-accordion-details-card">
                                            <h3>{item.hour}</h3>
                                            <img src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="..." />
                                            <p>{item.description}</p>
                                            <p>{Math.floor(item.temp)}&#8451;</p>
                                        </div>
                                    ))}

                                </div>
                            </Accordion>
                        </div>

                    ))
                }
            </div>
        </main>
    )
}

export default Forecast;