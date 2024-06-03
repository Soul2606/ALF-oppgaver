const form_element = document.getElementById("main-form")
const results_element = document.getElementById("results")

form_element.addEventListener("submit", function(event){
    
    event.preventDefault()
    
	let form_data = new FormData(this)
	let form_data_array = [...form_data]
    const first_name = form_data_array[0][1]
    const middle_name = form_data_array[1][1]
    const mail = first_name + middle_name + "@mafia.maf"
    results_element.textContent = mail
})