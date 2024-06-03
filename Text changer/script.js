const form_element = document.getElementById("main-form")
const button_length = document.getElementById("button-length")
const button_large = document.getElementById("button-large")
const button_small = document.getElementById("button-small")
const arbitrary_text1_element = document.getElementById("arbitrary-text1")
const result_length_element = document.getElementById("result-length")


button_length.addEventListener("click", function(){

    let form_data = new FormData(form_element)
    let form_data_array = [...form_data]
    let text = form_data_array[0][1]
    
    result_length_element.textContent = text.length
})

button_large.addEventListener("click", function(){
    
})