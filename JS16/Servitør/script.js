
async function get_text_file(file){

    let response = await fetch(file)
    let data = await response.text()

    return data
}

get_text_file("Daily_steps.txt").then((text)=>{

    const text_array = text.split(",")
    let sum = 0
    for (let i = 0; i < text_array.length; i++) {
        const element = text_array[i]
        sum += Number(element)
    }

    document.getElementById("income-this-month").textContent = "This month kr" + sum
})