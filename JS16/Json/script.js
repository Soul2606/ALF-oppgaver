
function create_object(name, type, flex_direction, satellite_elements){
	const main = document.createElement("div")
	main.classList.add("object")
	main.classList.add(flex_direction)

	const text_info_container = document.createElement("div")
	text_info_container.className = "object-info"
	main.appendChild(text_info_container)

	const name_element = document.createElement("h3")
	name_element.textContent = name
	text_info_container.appendChild(name_element)

	const type_element = document.createElement("h4")
	type_element.textContent = type
	text_info_container.appendChild(type_element)
	
	const satellites_container = document.createElement("div")
	satellites_container.classList.add("object-satellites")
	satellites_container.classList.add(flex_direction)
	for (let i = 0; i < satellite_elements.length; i++) {
		const element = satellite_elements[i]
		satellites_container.appendChild(element)
	}
	main.appendChild(satellites_container)

	return main
}




function create_elements_from_satellites(satellites = [], flex_direction){
	let elements = []
	for (let i = 0; i < satellites.length; i++) {
		const object = satellites[i];
		elements.push(create_object(object.name, object.type, flex_direction, create_elements_from_satellites(object.satellites, flex_direction === "flex-row"? "flex-column": "flex-row")))
	}
	return elements
}




async function get_json_file(json_file){
	let response = await fetch(json_file)
	let data = await response.json()
	return data
}




get_json_file("Space.json").then(data => {
	console.log(data)

	const root_div = document.getElementById("main")

	const solar_system = data.systems[0].system_architecture
	console.log(solar_system)

	root_div.appendChild(create_object(solar_system.name, solar_system.type, "flex-row", create_elements_from_satellites(solar_system.satellites, "flex-column")))
})
