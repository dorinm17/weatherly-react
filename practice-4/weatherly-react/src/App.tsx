import Header from "./components/Header/Header";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Footer from "./components/Footer/Footer";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import TodayForecast from "./components/TodayForecast/TodayForecast";

function App() {
  return (
    <>
      <Header />
      <LoadingSpinner />

      <main>
        <DailyForecast />
        <TodayForecast />
        <CurrentWeather />
      </main>

      <Footer />
    </>
  );
}

export default App;
