
const sitename = "https://github.com/Soul2606 sondreu.kodehode@gmail.com"
const date_now = new Date()
const current_time = {
    year:date_now.getUTCFullYear(),
    month:date_now.getUTCMonth()+1,
    day:date_now.getUTCDate(),
    hours:date_now.getHours(),
    minutes:date_now.getMinutes(),
    seconds:date_now.getSeconds()
}
const weather_data = JSON.parse(localStorage.getItem("weather data"))
const timeseries_div = document.getElementById("timeseries")
const weather_table = document.getElementById("weather-table")
const year_p = document.getElementById("year")
const month_p = document.getElementById("month")




function create_weather_table(weather_data) {
    console.groupCollapsed("create weather table")

    const weather_data_timeseries = weather_data.properties.timeseries
    year_p.textContent = weather_data_timeseries[0].time.slice(0, 4)
    month_p.textContent = weather_data_timeseries[0].time.slice(5, 7)

    for (let i = 0; i < weather_data_timeseries.length; i++) {
        const data = weather_data_timeseries[i].data
        const time = weather_data_timeseries[i].time.slice(0, 13).split("-")
        const data_instant = data.instant.details

        let data_next_1_hours
        let data_next_6_hours
        let data_next_12_hours
        if (data.next_1_hours !== undefined && data.next_6_hours !== undefined && data.next_12_hours !== undefined) {
            data_next_1_hours = data.next_1_hours.summary.symbol_code
            data_next_6_hours = data.next_6_hours.summary.symbol_code
            data_next_12_hours = data.next_12_hours.summary.symbol_code
        }

        console.log(data)
        console.log('time', time, 'instant', data_instant, 'next 1 hours', data_next_1_hours, 'next 6 hours', data_next_6_hours, 'next 12 hours', data_next_12_hours)

        const timeseries_item_div = document.createElement("tr")
        timeseries_item_div.className = "timeseries-item"

        const time_td = document.createElement("td")
        time_td.textContent = time[2].slice(0, 2) + ":" + time[2].slice(3, 5)
        timeseries_item_div.appendChild(time_td)

        const air_pressure_at_sea_level_td = document.createElement("td")
        air_pressure_at_sea_level_td.textContent = data_instant.air_pressure_at_sea_level + "hPa"
        timeseries_item_div.appendChild(air_pressure_at_sea_level_td)

        const air_temperature_td = document.createElement("td")
        air_temperature_td.textContent = data_instant.air_temperature + "c"
        timeseries_item_div.appendChild(air_temperature_td)

        const cloud_area_fraction_td = document.createElement("td")
        cloud_area_fraction_td.textContent = data_instant.cloud_area_fraction + "%"
        timeseries_item_div.appendChild(cloud_area_fraction_td)

        const relative_humidity_td = document.createElement("td")
        relative_humidity_td.textContent = data_instant.relative_humidity + "%"
        timeseries_item_div.appendChild(relative_humidity_td)

        const wind_from_direction_td = document.createElement("td")
        wind_from_direction_td.textContent = data_instant.wind_from_direction
        timeseries_item_div.appendChild(wind_from_direction_td)

        const next_1_hours_td = document.createElement("td")
        next_1_hours_td.textContent = data_next_1_hours
        timeseries_item_div.appendChild(next_1_hours_td)

        const next_6_hours_td = document.createElement("td")
        next_6_hours_td.textContent = data_next_6_hours
        timeseries_item_div.appendChild(next_6_hours_td)

        const next_12_hours_td = document.createElement("td")
        next_12_hours_td.textContent = data_next_12_hours
        timeseries_item_div.appendChild(next_12_hours_td)

        weather_table.appendChild(timeseries_item_div)
    }
    console.groupEnd()
}




async function get_json_file(json_file){
	let response = await fetch(json_file)
	let data = await response.json()
	return data
}




document.getElementById("get-data-button").addEventListener("click", ()=>{
    const current_time_from_last_request = JSON.parse(localStorage.getItem("last request time"))
    console.log("current time", current_time, "current time from last request", current_time_from_last_request)
    if(current_time_from_last_request.year >= current_time.year && current_time_from_last_request.month >= current_time.month && current_time_from_last_request.day >= current_time.day && current_time_from_last_request.hours >= current_time.hours && current_time_from_last_request.minutes >= current_time.minutes + 1){
        console.log("stop")
        return
    }
    localStorage.setItem("last request time", JSON.stringify(current_time))
    console.log("continue")
    get_json_file("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59&lon=10").then(data => {
        console.log("data", data)
        localStorage.setItem("weather data", JSON.stringify(data))
        create_weather_table(data)
    })
})




console.log(weather_data)

create_weather_table(weather_data)


