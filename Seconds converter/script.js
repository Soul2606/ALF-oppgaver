
const form_element = document.getElementById("main-form")
const results_element = document.getElementById("results")

form_element.addEventListener("submit", function(event){
    
    event.preventDefault()
    
	let form_data = new FormData(this)
	let form_data_array = [...form_data]
    let seconds = Number(form_data_array[0][1])
    let minuets = 0
    let hours = 0
    const max_iterations = 1000000
    let iterations = 0
    while(seconds >= 60 && iterations < max_iterations){
        minuets++
        seconds -= 60
        iterations++
    }
    while(minuets >= 60 && iterations < max_iterations){
        hours++
        minuets -= 60
        iterations++
    }
    if(iterations > max_iterations){
        results_element.textContent = "error"
    }else{
        results_element.textContent = seconds + ":" + minuets + ":" + hours
    }
})