import React from "react";
import cl from './CityHeader.module.scss'

const CityHeader = ({city, setcity}) =>{
    const citySearch = document.querySelector('#search')
    const cityField = document.querySelector('#field')
    return (
        <div id="field" className={cl.weather__city} onClick={(e) => {
            if(e.currentTarget===cityField ){
                citySearch.classList.remove('hidden')}
            }}>
            {city}
            <input id='search'  onChange={(e) => {setcity(e.target.value); }}  className={cl.weather__search + ' hidden'} defaultValue={city}></input>
            </div>
    )
}

export default CityHeader