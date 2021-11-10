const divGen1 = document.querySelector(".gen1")
const pokemonNumber = 151

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#e4a6f7',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5',
    ghost:"#9c79a6",
    ice:"#62b1c4"
};

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemonNumber; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = "https://pokeapi.co/api/v2/pokemon/"+id;
	const res = await fetch(url);
	const pokemon = await res.json();
	pokedex(pokemon);
};

function pokedex(pokemon) {
        const firstGen = document.createElement("article")
        firstGen.className = "pokemon"
        divGen1.appendChild(firstGen)
    
        const h3 = document.createElement("h3")
        h3.innerText =  "n°"+ pokemon.id + " " + pokemon.name
        firstGen.appendChild(h3)
    
        const imgCont = document.createElement("div")
        imgCont.className = "imgCont"
        firstGen.appendChild(imgCont)
        const img = document.createElement("img")
        img.src = pokemon.sprites.other.dream_world.front_default
        imgCont.appendChild(img)
    
        const h4 = document.createElement("h4")
        h4.innerText = "Moves :"
        firstGen.appendChild(h4)
        const ul = document.createElement("ul")
        firstGen.appendChild(ul)
        if (pokemon.moves.length >= 4) {
            for (let i = 0; i < 4; i++) {
                const li = document.createElement("li")
                li.innerText = pokemon.moves[i].move.name
                ul.appendChild(li) 
             }
        }
        else {
            for (let i = 0; i < pokemon.moves.length; i++) {
                const li = document.createElement("li")
                li.innerText = pokemon.moves[i].move.name
                ul.appendChild(li) 
             }
        }

        const type = pokemon.types[0].type.name
        firstGen.style.backgroundColor = colors[type]

        fetch("https://pokeapi.co/api/v2/pokemon-species/"+pokemon.id)
        .then(resp => resp.json())
        .then(data => {{
            if (data.evolves_from_species != null) {

                let string = data.evolves_from_species.url
                let newString = string.replace('https://pokeapi.co/api/v2/pokemon-species/','');
                let evId = newString.replace('/', '')

                let previousEv = document.createElement("div")
                previousEv.className = "thumb"
                let previousTitle = document.createElement("h4")
                let previousName = document.createElement("p")
                let previousImg = document.createElement("img")
                previousImg.className = "thumbImg"
                
                previousTitle.innerText = "Evolvution of :"
                previousImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"+(evId)+".svg"
                previousName.innerText = data.evolves_from_species.name

                previousEv.appendChild(previousTitle)
                previousEv.appendChild(previousName)
                previousEv.appendChild(previousImg)
                firstGen.appendChild(previousEv)
            }
        }})

}

fetchPokemons()