// import { createDOM } from "./utils/dom.js"
// import { formatDate, formatTemp } from "./utils/format-data.js"

// export function periodTimeTemplate({ temp, date, icon, description }) {



//     return `

//   <li class="dayWeather-item is-selected">
//   <span class="dayWeather-time">${date}</span>
//   <img class="dayWeather-icon" height="48" width="48" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" rain="">
//   <span class="dayWeather-temp">${temp}</span>
// </li>

// `

// }

// export function createPeriodTime(weather) {
//     // temp
//     // icon 
//     // date 
//     // description
//     const dateOptions = {
//         hour: 'numeric',
//         hour12: true,
//     }
//     const temp = formatTemp(weather.main.temp)
//     const date = formatDate(new Date(weather.dt * 1000), dateOptions)
//     const config = {
//         temp,
//         date,
//         icon: weather.weather[0].icon,
//         description: weather.weather[0].description
//     }
//     return createDOM(periodTimeTemplate(config))
// }


import { createDOM } from "./utils/dom.js";
import { formatDate, formatTemp } from "./utils/format-data.js";

export function periodTimeTemplate({
    temp,
    date,
    icon,
    description,
    tempMax,
    tempMin,
    win,
    humidity,
}) {
    return `<li class="dayWeather-item" data-temp-max="${tempMax}" data-temp-min="${tempMin}" data-win="${win}" data-humidity="${humidity}" >
      <span class="dayWeather-time">${date}</span>
      <img
        class="dayWeather-icon"
        height="48" width ="48"
        src="https://openweathermap.org/img/wn/${icon}@2x.png"
        alt=${description}
        rain=""
      />
      <span class="dayWeather-temp">${temp}</span>
    </li>`;
}

export function createPeriodTime(weather) {
    //temp
    //icon
    //date
    //description
    // console.log(weather);
    const dateOptions = {
        hour: "numeric",
        hour12: true,
    };
    const temp = formatTemp(weather.main.temp);
    const tempMax = formatTemp(weather.main.temp_max);
    const tempMin = formatTemp(weather.main.temp_min);

    const date = formatDate(new Date(weather.dt * 1000), dateOptions);

    const config = {
        temp,
        date,
        icon: weather.weather[0].icon,
        description: weather.weather[0].description,
        tempMax,
        tempMin,
        win: weather.wind.speed,
        humidity: weather.main.humidity,
    };

    return createDOM(periodTimeTemplate(config));
}