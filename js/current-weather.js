// import weather from '../data/current-weather.js'
import { formatDate, formatTemp } from './utils/format-data.js'
import { weatherConditionsCodes } from './constants.js'
import { getLatLong } from './geolocation.js'
import { getCurrentWeather } from './services/weather.js'

// convierte el digito para saber tipo de clima
// String(weather.weather[0].id).charAt(0)

// funcion para la ciudad
function setCurrentCity($el, city) {
    $el.textContent = city
}

// funcion para la fecha
function setCurrentDate($el) {
    const date = new Date()
    const formattedDate = formatDate(date)
    $el.textContent = formattedDate
}

// funcion para la temperatura
function setCurrentTemp($el, temp) {
    $el.textContent = formatTemp(temp)
}

// Para saber si es de dia o de noche
function solarStatus(sunsetTime, sunriseTime) {
    const currentHours = new Date().getHours()
    const sunsetHours = sunsetTime.getHours()
    const sunriseHours = sunriseTime.getHours()

    if (currentHours > sunsetHours || currentHours < sunriseHours) {
        return 'night'
    }
    return 'morning'
}

// funcion para el background
function setBackground($el, conditionCode, solarStatus) {
    const weatherType = weatherConditionsCodes[conditionCode]
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ? '@2x' : ''
        // true ? '@2x' : ''
    $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`
}

function showCurrentWeather($app, $loader) {
    $app.hidden = false
    $loader.hidden = true
}



function configCurrentWeather(weather) {

    const $app = document.querySelector('#app')
    const $loading = document.querySelector('#loading')

    //loader
    showCurrentWeather($app, $loading)

    //date
    const $currentWeatherDate = document.querySelector('#current-weather-date')
    setCurrentDate($currentWeatherDate)

    //city
    const $currentWeatherCity = document.querySelector('#current-weather-city')
    const city = weather.name
    setCurrentCity($currentWeatherCity, city)
        // $currentWeatherCity.textContent = weather.name
        //debugger
        //temp
    const $currentWeatherTemp = document.querySelector('#current-weather-temp')
    const temp = weather.main.temp
    setCurrentTemp($currentWeatherTemp, temp)


    //background
    const sunriseTime = new Date(weather.sys.sunrise * 1000)
    const sunsetTime = new Date(weather.sys.sunset * 1000)

    const conditionCode = String(weather.weather[0].id).charAt(0)
    setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime))
}

export default async function currentWeather() {
    // GEO // API -weather // config
    // console.log('esto pasa ANTES de getCurrentPosition')

    const { lat, lon, isError } = await getLatLong()
    if (isError) return console.log('ha ocurrido un error ubicandote')
        // console.log(lat, lon)

    // getCurrentPosition()
    //     .then((data) => {
    //         console.log('Hemos triunfado', data)
    //     })
    //     .catch((message) => {
    //         console.log(message)
    //     })
    // console.log('esto pasa DESPUES de getCurrentPosition')
    const { isError: currentWeatherError, data: weather } = await getCurrentWeather(lat, lon)
    if (currentWeatherError)
        return console.log('ha ocurrido un error en los datos del clima')
    configCurrentWeather(weather)
        // console.log(weather)
        // console.log(weeather)
}