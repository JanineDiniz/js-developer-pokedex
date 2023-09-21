const content = document.getElementById('content')
const pokeName = document.getElementById('pokeName')
const pokeNumber = document.getElementById('pokeNumber')
const pokeTypes = document.getElementById('pokeTypes')
const pokeImag = document.getElementById('pokeImag')
const pokeSpecies = document.getElementById('species')
const pokeHeight = document.getElementById('height')
const pokeWeight = document.getElementById('weight')
const pokeAbilities = document.getElementById('abilities')


function addZeroes(pokemonOrder) {
    var numberWithZeroes = String(pokemonOrder);
    var counter = numberWithZeroes.length;
      
    while(counter < 3) {
        numberWithZeroes = "0" + numberWithZeroes;
        counter++;
    }
  return numberWithZeroes;
}

function closeTab(){
    window.close()
}

//Pegar id via GET
function getId(){
    const getUrl = window.location.href
    const paramUrl = new URL(getUrl)
    const id = paramUrl.searchParams.get("id")
    return id
}

//Inserir, dinamicamente, informações na página
function pokemonDetails(id){
    pokeApi.getPokemonDetailById(id).then((pokemonDet) => {
        //Cor de fundo de acordo com o tipo
        content.classList.add(`${pokemonDet.type}`)
        
        
        //Adicionar o nome do Pokemon
        pokeName.innerHTML = pokemonDet.name

        //Adicionar id do Pokemon
        pokeNumber.innerHTML = `#${addZeroes(pokemonDet.id)}`

        //Adicionar tipos do Pokemon
        pokeTypes.innerHTML = `
            ${pokemonDet.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        `

        //Adicionar imagem do Pokemon
        pokeImag.innerHTML = `<img src='${pokemonDet.photo}' alt='${pokemonDet.name}'>`

        //Adicionando "Informations" do Pokemon
        pokeSpecies.innerHTML = pokemonDet.name
        pokeHeight.innerHTML = `${pokemonDet.height/10} m`
        pokeWeight.innerHTML = `${pokemonDet.weight/10} Kg`
        pokeAbilities.innerHTML = `${pokemonDet.ability.map((slot) => `<p>${slot.ability.name}</p>`).join('')}`

    })
}

pokemonDetails(getId())

window.onload = information()