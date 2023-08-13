import { createDOM } from "./utils/dom.js";
import { formatTemp } from "./utils/format-data.js";

export function atmosphericTemplate({ tempMax, tempMin, win, humidity }) {
    return `<div class="descriptionAtmosphericTemplate">
                <div class="descriptionAtmospheric">
                <span>Máx: <span class="tempMax">${tempMax}</span></span>
                 <span>Mín: <span class="tempMin">${tempMin}</span></span>
                </div>
                <div class="descriptionAtmospheric">
                 <span>Viento: <span class="weatherWin">${win}</span> km/h</span>
                  <span>Humedad: <span class="weatherHumidity">${humidity}</span>%</span>
                </div>
              </div>`;
}

export function configEventListenerAtmospheric() {
    const $listWeatherDOM = document.querySelectorAll(".dayWeather-item");
    $listWeatherDOM.forEach(($weatherDOM) => {
        $weatherDOM.addEventListener("click", (event) => {
            setDescriptionWeather(event.currentTarget);
        });
    });
}

//recibimos el targetWeather-elemento y obtenemos los valores para editar la description del weather
export function setDescriptionWeather(targetWeather) {
    let tempMax = targetWeather.dataset.tempMax;
    let tempMin = targetWeather.dataset.tempMin;
    let win = targetWeather.dataset.win;
    let humidity = targetWeather.dataset.humidity;

    document.querySelector(".tempMax").textContent = tempMax;
    document.querySelector(".tempMin").textContent = tempMin;
    document.querySelector(".weatherWin").textContent = win;
    document.querySelector(".weatherHumidity").textContent = humidity;

    const $daySelected = targetWeather;
    const $parentTarget = $daySelected.parentElement;
    const $dayActive = $parentTarget.querySelector(
        ".dayWeather-item.is-selected"
    );

    if ($dayActive && $dayActive !== $daySelected) {
        $dayActive.classList.remove("is-selected");
        $daySelected.classList.add("is-selected");
    } else {
        $daySelected.classList.add("is-selected");
    }
}