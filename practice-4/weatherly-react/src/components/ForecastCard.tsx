function ForecastCard() {
  return (
    <div className="day">
      <div className="weather-for-the-day">
        <p>Today</p>
        <img src="images/sun-and-clouds.svg" alt="" />
      </div>

      <div className="weather-condition">
        <p>Partly sunny</p>
        <p>
          <span className="temperature">6&deg;</span> / -1&deg;{" "}
          <span className="temperature">C</span>
        </p>
      </div>
    </div>
  );
}

export default ForecastCard;
