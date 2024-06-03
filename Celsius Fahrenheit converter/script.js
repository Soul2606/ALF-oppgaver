const temperature_conversion_form_element = document.getElementById("temperature-conversion-form")
const result_paragraph_element = document.getElementById("result")

temperature_conversion_form_element.addEventListener("submit", function(event){

	event.preventDefault()

	let form_data = new FormData(this)
	let form_data_array = [...form_data]
	let temperature_unit_conversion_value = form_data_array[0][1]
	let temperature_unit_conversion = form_data_array[1][1]
	let temperature_unit_conversion_result

	if(temperature_unit_conversion === "celsius-to-fahrenheit"){
		temperature_unit_conversion_result = temperature_unit_conversion_value * 9/5 + 32
	}else{
		temperature_unit_conversion_result = (temperature_unit_conversion_value - 32) * 5 / 9
	}
	result_paragraph_element.textContent = String(temperature_unit_conversion_result)
})