
const form_element = document.getElementById("main-form")
const results_element = document.getElementById("results")

form_element.addEventListener("submit", function(event){
    
    event.preventDefault()
    
	let form_data = new FormData(this)
	let form_data_array = [...form_data]
    const age = Number(form_data_array[0][1])
    if(age > 150){
        results_element.textContent = "You are a miracle"
    }else if(age > 67){
        results_element.textContent = "You are pensioner"
    }else if(age > 18){
        results_element.textContent = "You are adult"
    }else{
        results_element.textContent = "You are not adult"
    }
})