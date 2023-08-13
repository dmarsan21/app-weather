// se agrega el template para los datos 
import { setDescriptionWeather } from "./atmospheric-template.js";

const $tabContainer = document.querySelector('#tabs')
const $tabList = $tabContainer.querySelectorAll('.tab')


const today = new Date()
let weekday = today.getDay()

const week = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado'
]

function nextDay(day) {
    if (day === 6) {
        return 0
    }
    return day + 1
}

$tabList.forEach(($tab, index) => {
    $tab.addEventListener('click', handleSelectTabClick)
    if (index === 0) {
        $tab.textContent = 'Hoy'
        weekday = nextDay(weekday)
        return false
    }
    $tab.textContent = week[weekday]
    weekday = nextDay(weekday)
})

function handleSelectTabClick(event) {
    const $tabSelected = event.target
    const $tabActive = document.querySelector('.tab[aria-selected="true"]')
    $tabActive.removeAttribute('aria-selected')
    $tabSelected.setAttribute('aria-selected', true)

    const id = $tabSelected.id
    const $tabPanel = document.querySelector(`[aria-labelledby=${id}]`)
    const $tabPanelSelected = document.querySelector(`.tabPanel:not([hidden])`)
    $tabPanel.hidden = false
    $tabPanelSelected.hidden = true

    //se obtine el primer elemento del panel seleccionado
    const $firstDayWeather = $tabPanel.querySelector(".dayWeather-item");
    const $dayActive = $tabPanel.querySelector(".dayWeather-item.is-selected");

    if ($dayActive && $dayActive !== $firstDayWeather) {
        $firstDayWeather.classList.add("is-selected");
        $dayActive.classList.remove("is-selected");
    } else {
        $firstDayWeather.classList.add("is-selected");
    }

    //actualiza la información-enviamos el primer elemento
    setDescriptionWeather($firstDayWeather);
}