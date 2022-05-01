import React, {useState, useEffect} from "react";
import WeatherWidget from './components/WeatherWidget'
import UserWeather from "./API/UserWeather";
import { useWeather } from "./components/hooks/useWeather";

function App() {
  const [curCity, setCurCity] = useState('Moscow')
  const [city, setCity] = useState('')
  const [temp, setTemp] = useState('')
  const [cond, setCond] = useState('')
  const [wind, setWind] = useState('')
  const [pres, setPres] = useState('')
  const [feel, setFeel] = useState('')
  const [hum, setHum] = useState('')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [icon, setIcon] = useState('http://openweathermap.org/img/wn/10d@2x.png')
  
  const cityField = document.querySelector('#field')
  const citySearch = document.querySelector('#search')
  const determineCity = (e) =>{
    setCurCity(e.target.value)
    
  }
  const [fetchWeather] = useWeather( curCity, async(curCity) =>{
    const [locationCity, response] = await UserWeather.getAll(curCity)
    console.log(curCity)
    setCity(response.data.name)
    setWind(Math.round(response.data.wind.speed) + ' м/с')
    setPres(Math.round(response.data.main.pressure/1.33))
    setFeel(Math.round(response.data.main.feels_like - 273))
    setHum(response.data.main.humidity + ' %')
    setTemp(Math.round(response.data.main.temp - 273))
    setCond(response.data.weather[0].description.toUpperCase())
    setMin(Math.round(response.data.main.temp_min - 273))
    setMax(Math.round(response.data.main.temp_max - 273))
    setIcon('http://openweathermap.org/img/wn/' + response.data.weather[0].icon + '@2x.png')
  })

  useEffect( () =>{
    fetchWeather(curCity)
  }
  , [curCity])

  return (
    <div className="App" onClick={(e)=>{
      if(e.target!==cityField ){
        citySearch.classList.add('hidden')
        cityField.classList.remove('hidden')
        cityField.style.color = '#e6e6e6'
        } if(e.target===citySearch) {
          citySearch.classList.remove('hidden')
        }
        }}
        onChange={(e) =>{ determineCity(e); 
          if(e.target===document.activeElement){
            cityField.style.color = 'transparent'
          } else {
            cityField.style.color = '#e6e6e6';
          }
        }}
        >
      <WeatherWidget min={min} max={max} wind={wind} pres={pres} hum={hum} feel={feel} city={city} setcity={setCity} temp={temp} settemp={setTemp} icon={icon} cond={cond}/>
      
    </div>
  );
}

export default App;
