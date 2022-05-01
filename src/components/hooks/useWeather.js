import { useState } from "react";

export const useWeather = (city, callback) =>{
    const [weatherError, setWeatherError] = useState(false)
    const [isWeatherLoading, setIsWeatherLoading] = useState(false)
    const fetching = async (city) =>{ 
        await callback(city)
    }
    return [fetching, isWeatherLoading, weatherError]
}

