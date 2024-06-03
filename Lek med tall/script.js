
const form_element = document.getElementById("main-form")
const output_half = document.getElementById("output-half")
const output_double = document.getElementById("output-double")
const output_triple_double = document.getElementById("output-triple-double")
const output_squared = document.getElementById("output-squared")


form_element.addEventListener("submit", function(event){
    
    event.preventDefault()
    
	let form_data = new FormData(this)
	let form_data_array = [...form_data]
    const user_number = Number(form_data_array[0][1])

    output_half.textContent = user_number / 2
    output_double.textContent = user_number * 2
    output_triple_double.textContent = (user_number * 2) * 2
    output_squared.textContent = user_number ** 2
})