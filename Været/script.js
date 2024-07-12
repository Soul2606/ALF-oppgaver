
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
const year_p = document.getElementById("year")
const month_p = document.getElementById("month")



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
    })
})




console.log(weather_data)

const weather_data_timeseries = weather_data.properties.timeseries
year_p.textContent = weather_data_timeseries[0].time.slice(0,4)
month_p.textContent = weather_data_timeseries[0].time.slice(5,7)

for (let i = 0; i < weather_data_timeseries.length; i++) {
    const data = weather_data_timeseries[i].data
    const time = weather_data_timeseries[i].time.slice(0, 13).split("-")
    const data_instant = data.instant.details
    const data_next_6_hours = data.next_6_hours.summary.symbol_code
    const data_next_12_hours = data.next_12_hours.summary.symbol_code

    console.log(time, data)

    const timeseries_item_div = document.createElement("div")
    timeseries_item_div.className = "timeseries-item"

    const time_p = document.createElement("p")
    time_p.textContent = time[2].slice(0,2) + ":" + time[2].slice(3,5)
    time_p.style = "margin-right: 20px;"
    timeseries_item_div.appendChild(time_p)

    const air_pressure_at_sea_level_p = document.createElement("p")
    air_pressure_at_sea_level_p.textContent = "Air pressure at sea level: " + data_instant.air_pressure_at_sea_level
    timeseries_item_div.appendChild(air_pressure_at_sea_level_p)

    timeseries_div.appendChild(timeseries_item_div)
}
