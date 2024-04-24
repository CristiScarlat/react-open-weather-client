const About = () => {
  return (
    <main>
      <div className="about-container">
        <h3>Open Weather Client App is a client application for <a href="https://openweathermap.org/api">Open Weather
          Map API</a>.</h3>
        <p>You can search for weather data using the input field in the header.</p>
        <p>Please use the english version of your city name(ex. "București" has to be "Bucharest")</p>
        <hr/>
        <div className="about-card">
          <img src="/images/forecast-about-1.png"/>
          <p>You can see the forecast temperatures in an 3 hours interval for five days in cards like this.</p>
        </div>

        <div className="about-card">
          <img src="/images/forecast-about-2.png"/>
          <p>And if you expand the footer of the card, you can see the forecasted weather description.</p>
        </div>
      </div>
    </main>
  )
}

export default About;