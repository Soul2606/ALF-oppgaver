const form_element = document.getElementById("main-form")
const results_element = document.getElementById("results")

form_element.addEventListener("submit", function(event){
    
    event.preventDefault()
    
	let form_data = new FormData(this)
	let form_data_array = [...form_data]
    const user_name = form_data_array[0][1]
    const password = form_data_array[1][1]
    if(user_name === "truls dust123" && password === "pass123"){
        results_element.textContent = "you are now logged in"
    }else{
        results_element.textContent = "wrong password or username"
    }
})