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




document.getElementById("weather-data-string").textContent = localStorage.getItem("weather data")