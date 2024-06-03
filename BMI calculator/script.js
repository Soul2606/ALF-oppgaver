
const form_element = document.getElementById("main-form")
const results_element = document.getElementById("results")

form_element.addEventListener("submit", function(event){
    
    event.preventDefault()
    
	let form_data = new FormData(this)
	let form_data_array = [...form_data]
    const height = Number(form_data_array[0][1])
    const weight = Number(form_data_array[1][1])
    const BMI = weight / (height ** 2)
    results_element.textContent = "Your BMI: " + BMI
})