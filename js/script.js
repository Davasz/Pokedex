const data_number = document.querySelector(".pokemon-number")
const data_name = document.querySelector(".pokemon-name")
const form = document.querySelector(".form")
const inputData = document.querySelector(".input_search")
const imgPoke = document.querySelector(".pokemon-image")
const btnNext = document.querySelector("#btn-next")
const btnPrev = document.querySelector("#btn-prev")

let position = 1

const renderPoke = async (pokemon) => {
    data_number.innerHTML = ""
    data_name.innerHTML = "loading"
    
    imgPoke.src = "img/loading.gif"
    const data = await feachPoke(pokemon)
    
    if(data) {
        imgPoke.style.display = 'block'
        imgPoke.src = data.sprites.versions['generation-v']['black-white'].animated['front_default']
        data_name.innerHTML = data.name
        position = data.id
        data_number.innerHTML = position   
    } else {
        imgPoke.style.display = 'none'
        data_number.innerHTML = ""
        data_name.innerHTML = "not found :("
    }
    inputData.value = ""
}

const feachPoke = async (pokemon) => {
    const dataBrut = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if (dataBrut.status === 200) {
        const data = await dataBrut.json()
        return data
    } 
   
}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    renderPoke(inputData.value.toLowerCase())
})

btnNext.addEventListener('click', () => {
    
    renderPoke(position += 1)
})

btnPrev.addEventListener('click', () => {
    if (position > 1) {
    renderPoke(position -= 1)
    } 
})

renderPoke(position)