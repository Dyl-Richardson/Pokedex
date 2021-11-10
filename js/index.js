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

// let evId = ""

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

        const evolution = document.createElement("h4")
        evolution.innerText = "Evolution chain :"
        firstGen.appendChild(evolution)

        const evolutionDiv = document.createElement("div")
        evolutionDiv.className = "evolutionDiv"
        firstGen.appendChild(evolutionDiv)

        fetch("https://pokeapi.co/api/v2/pokemon-species/"+pokemon.id)
        .then(resp => resp.json())
        .then(data => {
                let string = data.evolution_chain.url
                let newString = string.replace('https://pokeapi.co/api/v2/evolution-chain/','');
                let evId = newString.replace('/', '')

                fetch("https://pokeapi.co/api/v2/evolution-chain/"+evId)
                    .then(resp => resp.json())
                    .then(data => {
                        //! A ameliorer
                        if (data.chain.evolves_to.length >= 1) {
                            console.log(data.chain.evolves_to.length);
                        //First evolution
                        let firstEv = data.chain.species

                        let string3 = firstEv.url
                        let newString3 = string3.replace('https://pokeapi.co/api/v2/pokemon-species/','');
                        let evId3 = newString3.replace('/', '')

                        let firstEvImg = document.createElement("img")
                        firstEvImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"+evId3+".svg"
                        let firstEvName = document.createElement("p")
                        firstEvName.innerText = firstEv.name

                        evolutionDiv.appendChild(firstEvName)
                        evolutionDiv.appendChild(firstEvImg)
                        
                        // Middle evolution
                        let nextEv = data.chain.evolves_to[0].species

                        let string = nextEv.url
                        let newString = string.replace('https://pokeapi.co/api/v2/pokemon-species/','');
                        let evId = newString.replace('/', '')

                        let nextEvImg = document.createElement("img")
                        nextEvImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"+evId+".svg"
                        let nextEvName = document.createElement("p")
                        nextEvName.innerText = nextEv.name
                        
                        evolutionDiv.appendChild(nextEvName)
                        evolutionDiv.appendChild(nextEvImg)

                        // Last evolution
                        let lastEv = data.chain.evolves_to[0].evolves_to[0].species

                        let string2 = lastEv.url
                        let newString2 = string2.replace('https://pokeapi.co/api/v2/pokemon-species/','');
                        let evId2 = newString2.replace('/', '')

                        let lastEvImg = document.createElement("img")
                        lastEvImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"+evId2+".svg"
                        let lastEvName = document.createElement("p")
                        lastEvName.innerText = lastEv.name

                        evolutionDiv.appendChild(lastEvName)
                        evolutionDiv.appendChild(lastEvImg)
                    }
                    else {
                        let firstEv = data.chain.species

                        let string3 = firstEv.url
                        let newString3 = string3.replace('https://pokeapi.co/api/v2/pokemon-species/','');
                        let evId3 = newString3.replace('/', '')

                        let firstEvImg = document.createElement("img")
                        firstEvImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"+evId3+".svg"
                        let firstEvName = document.createElement("p")
                        firstEvName.innerText = firstEv.name

                        evolutionDiv.appendChild(firstEvName)
                        evolutionDiv.appendChild(firstEvImg)
                    }
                    })  
        })

}

fetchPokemons()