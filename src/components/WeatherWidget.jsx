import React from "react";
import cl from './WeatherWidget.module.scss'
import CityHeader from "./UI/header/CityHeader";

const WeatherWidget = (props) => {
    return (
        <div className={cl.weather}>
            <div className={cl.weather__container}>
            <div className={cl.weather__top}>
                <div className={cl.weather__current}>
                    <CityHeader city={props.city} setcity={props.setcity}/>
                    <div className={cl.weather__temp} onClick={props.switchDegree}>{props.temp}</div>
                </div>
                <div onMouseDown={(e)=>e.preventDefault()} className={cl.weather__current}>
                    <div className={cl.weather__icon}>
                        <img src={props.icon} alt="icon"></img>
                    </div>
                    <div className={cl.weather__cond}>{props.cond}</div></div>
            </div>
            <div className={cl.weather__bottom}>
            <ul onMouseDown={(e)=>e.preventDefault()} className={cl.weather__metrics}>
                <li className={cl.weather__metric}>Мин: <span>{props.min}</span></li>
                <li className={cl.weather__metric}>Макс: <span>{props.max}</span></li>
                <li className={cl.weather__metric}>Ветер:<span>{props.wind}</span></li>
                <li className={cl.weather__metric}>Давление:<span>{props.pres} мм.рт.ст</span></li>
                <li className={cl.weather__metric}>Влажность:<span>{props.hum}</span></li>
                <li className={cl.weather__metric}>Ощущается как:<span>{props.feel}</span></li>
            </ul>
            </div>
            </div>
        </div>
    )
}

export default WeatherWidget;