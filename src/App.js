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
  const celcius = '° C'
  const fahrenheit = '° F'
  const cityField = document.querySelector('#field')
  const citySearch = document.querySelector('#search')
  const determineCity = (e) =>{
    setCurCity(e.target.value)
    
  }
  const [fetchWeather] = useWeather( curCity, async(curCity) =>{
    const [locationCity, response] = await UserWeather.getAll(curCity)
    setCity(response.data.name)
    setWind(Math.round(response.data.wind.speed) + ' м/с')
    setPres(Math.round(response.data.main.pressure/1.33))
    setFeel(Math.round(response.data.main.feels_like - 273)+celcius)
    setHum(response.data.main.humidity + ' %')
    setTemp(Math.round(response.data.main.temp - 273)+celcius)
    setCond(response.data.weather[0].description.toUpperCase())
    setMin(Math.round(response.data.main.temp_min - 273)+celcius)
    setMax(Math.round(response.data.main.temp_max - 273)+celcius)
    setIcon('http://openweathermap.org/img/wn/' + response.data.weather[0].icon + '@2x.png')
  })
  const switchDegree = () =>{
    if(temp.match(celcius)){
      setTemp(Math.round((parseInt(temp))*1.8 + 32) + fahrenheit)
      setFeel(Math.round((parseInt(feel))*1.8 + 32) + fahrenheit)
      setMin(Math.round((parseInt(min))*1.8 + 32) + fahrenheit)
      setMax(Math.round((parseInt(max))*1.8 + 32) + fahrenheit)
    } else {
      setTemp(Math.round((parseInt(temp) - 32) / 1.8) + celcius)
      setFeel(Math.round((parseInt(feel) - 32) / 1.8) + celcius)
      setMin(Math.round((parseInt(min) - 32) / 1.8) + celcius)
      setMax(Math.round((parseInt(max) - 32) / 1.8) + celcius)
    }
  }

  useEffect( () =>{
    switchDegree();
    fetchWeather(curCity)
  }
  , [])

  return (
    <div draggable className="App" onClick={(e)=>{
      if(e.target!==cityField ){
        citySearch.classList.add('hidden')
        cityField.classList.remove('hidden')
        cityField.style.color = '#e6e6e6'
        
        } if(e.target===citySearch) {
          
          cityField.style.color = 'transparent'
          citySearch.classList.remove('hidden')
          
        }
        e.stopPropagation()
        citySearch.focus()
        //citySearch.selectionStart = citySearch.selectionEnd = 100;
        }}
        onChange={(e) =>{ determineCity(e); 
          if(e.target===document.activeElement){
            cityField.style.color = 'transparent'
          } else {
            cityField.style.color = '#e6e6e6';
          }
        }}
        >
      <WeatherWidget min={min} max={max} wind={wind} pres={pres} hum={hum} feel={feel} city={city} setcity={setCity} temp={temp} switchDegree={switchDegree} icon={icon} cond={cond}/>
      
    </div>
  );
}

export default App;
