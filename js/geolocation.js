function geolocationSupport() {
    // if('geolocation' in navigator) {
    //   return true
    // }
    // return false
    return 'geolocation' in navigator
}

const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 100000,
}

export function getCurrentPosition(options = defaultOptions) {
    if (!geolocationSupport()) throw new Error('No hay soporte de geolocalizacion en tu navegador')

    //se creea una promesa

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            resolve(position)
                // console.log(lat, lon)
                // console.log('esto ES getCurrentPosition')
        }, () => {
            reject('no se pudo obtener tu ubicación')
        }, options)
    })

}

export async function getLatLong(options = defaultOptions) {
    try {
        const { coords: { latitude: lat, longitude: lon } } = await getCurrentPosition(options)
        return { lat, lon, isError: false }
    } catch {
        return { isError: true, lat: null, lon: null }
    }
}