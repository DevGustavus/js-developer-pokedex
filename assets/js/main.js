const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <div class="pokemonHeader">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
            </div>
            
            <img src="${pokemon.photo}" alt="${pokemon.name}">

            <div class="pokemonStatistics">

                <div class="pokemonStats1">
                    <ul>
                        <li>Weight ${pokemon.weight}</li>
                        <li>Height ${pokemon.height}</li>
                    </ul>

                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>

                <hr>

                <ul>
                    ${pokemon.stats.map((stat) => `<li>${stat}</li>`).join('')}
                </ul>
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})