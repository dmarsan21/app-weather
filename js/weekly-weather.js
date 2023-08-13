import { getWeeklyWeather } from './services/weather.js'
import { getLatLong } from './geolocation.js'
import { formatWeekList } from './utils/format-data.js'
import { createDOM } from './utils/dom.js'
import { createPeriodTime } from './period-time.js'
// esto se agrego de más
import {
    atmosphericTemplate,
    configEventListenerAtmospheric,
} from "./atmospheric-template.js";

import draggable from './draggble.js'

function tabPanelTemplate(id) {
    return `<div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
              <div class="dayWeather" id="dayWeather-0">
                <ul style="color:white" class="dayWeather-list" id="dayWeather-list-${id}">
                  
                </ul>
              </div>
            </div>`;
}

function createTabPanel(id) {
    const $panel = createDOM(tabPanelTemplate(id));

    if (id > 0) {
        $panel.hidden = true;
    }

    return $panel;
}

function configWeeklyWeather(weeklist) {
    const $container = document.querySelector(".tabs");
    let isFirst = true;
    let weatherFirst = null;
    weeklist.forEach((day, index) => {
        const $panel = createTabPanel(index);
        $container.append($panel);

        day.forEach((weather, indexWeather) => {
            if (isFirst) {
                weatherFirst = weather;
                isFirst = false;
            }

            $panel
                .querySelector(".dayWeather-list")
                .append(createPeriodTime(weather));
        });
    });

    firstPanelSelected();

    const data = {
        tempMax: weatherFirst.main.temp_max,
        tempMin: weatherFirst.main.temp_min,
        win: weatherFirst.wind.speed,
        humidity: weatherFirst.main.humidity,
    };

    $container.append(createDOM(atmosphericTemplate(data)));
}

//seleccionamos el primer elemento del panel para poder agregar la clase is-selected
function firstPanelSelected() {
    const $firstPanel = document.querySelector("#dayWeather-list-0");
    const $firstDay = $firstPanel.querySelector(".dayWeather-item");
    $firstDay.classList.add("is-selected");
}

export default async function weeklyWeather() {
    const $container = document.querySelector(".weeklyWeather");
    const { lat, lon, isError } = await getLatLong();
    if (isError) return console.log("Ah ocurrido un error ");
    const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(
        lat,
        lon
    );
    if (weeklyWeatherError) return console.log(" ha ocurrido  un error");

    const weeklist = formatWeekList(weather.list);
    configWeeklyWeather(weeklist);
    draggable($container);

    configEventListenerAtmospheric();
}