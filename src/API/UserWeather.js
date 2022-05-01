import axios from "axios"

export default class UserWeather{
    static async getAll(curCity){
    const locationCity = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${curCity}&appid=4e40c08fccea2102c5d9a9b96245ca9a`)
    const lat = await locationCity.data[0].lat
    const lon = await locationCity.data[0].lon
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&appid=4e40c08fccea2102c5d9a9b96245ca9a`)
    return Promise.all([locationCity, response])
}
}
