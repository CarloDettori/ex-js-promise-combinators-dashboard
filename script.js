"use strict"

async function fetchData(url) {
    const fetchData = await fetch(url)
    const obj = await fetchData.json()
    return obj[0]
}

async function getDashBoardData(citta) {

    const api = "https://boolean-spec-frontend.vercel.app/freetestapi/"
    const query = "?search="

    const cityNameCountry = fetchData(api + "destinations" + query + citta)
    const cityWeather = fetchData(api + "weathers" + query + citta)
    const cityAirport = fetchData(api + "airports" + query + citta)
    const results = await Promise.allSettled([cityNameCountry, cityWeather, cityAirport])

    console.log(results[0].value, results[1].value, results[2].value)



    const datas = {
        name: results[0].value ? results[0].value.name : null,
        country: results[0].value ? results[0].value.country : null,
        temperature: results[1].value ? results[1].value.temperature + " C°" : null,
        weather_description: results[1].value ? results[1].value.weather_description : null,
        airport_name: results[2].value ? results[2].value.name : null,
    }

    console.log(results[0].value)

    return datas
}

(async () => {
    const data = await getDashBoardData("Vienna")
    console.log(data)

    let cityInfo = `${data.name} is in ${data.country}.\n`
    let weatherInfo = `Today there are ${data.temperature} degrees and the weather is ${data.weather_description}.\n`
    let airportInfo = `The main airport is ${data.airport_name}.\n`

    if (!data.name || !data.country) {
        cityInfo = ""
    }
    if (!data.temperature || !data.weather_description) {
        weatherInfo = ""
    }
    if (!data.airport_name) {
        airportInfo = ""
    }

    console.log(
        cityInfo +
        weatherInfo +
        airportInfo
    );
})()