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
    for (let i = 1; i <= 151; i++) {
		await getPokemon(i);
	}	
};

const getPokemon = async id => {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon/"+id)
	const pokemon = await res.json()
    const res2 = await fetch("https://pokeapi.co/api/v2/pokemon-species/"+id)
    const pokemon2 = await res2.json()
	pokedex(pokemon, pokemon2);
};

function pokedex(pokemon, pokemon2) {
        const firstGen = document.createElement("article")
            firstGen.className = "pokemon"
        document.querySelector(".gen1").appendChild(firstGen)
    
        const h3 = document.createElement("h3")
            h3.innerText =  "n°"+ pokemon.id + " " + pokemon.name
        firstGen.appendChild(h3)
    
        const imgCont = document.createElement("div")
            imgCont.className = "imgCont"
        firstGen.appendChild(imgCont)
        const img = document.createElement("img")
            img.src = pokemon.sprites.other["official-artwork"].front_default
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

            fetch(pokemon2.evolution_chain.url)
                .then(resp => resp.json())
                .then(data => {
                    let string3 = data.chain.species.url
                    let newString3 = string3.replace('https://pokeapi.co/api/v2/pokemon-species/','');
                    let evId3 = newString3.replace('/', '')
                    
                    let firstEvName = document.createElement("p")
                        firstEvName.innerText = data.chain.species.name
                    evolutionDiv.appendChild(firstEvName)

                    let firstEvImg = document.createElement("img")
                        firstEvImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+evId3+".png"
                    evolutionDiv.appendChild(firstEvImg)
                    
                        if ((data.chain.evolves_to.length >= 1)
                            &&(evId3 != 133)
                            &&(evId3 != 134)
                            &&(evId3 != 135)
                            &&(evId3 != 136)) {
                            let string = data.chain.evolves_to[0].species.url
                            let newString = string.replace('https://pokeapi.co/api/v2/pokemon-species/','');
                            let evId = newString.replace('/', '')

                            let nextEvName = document.createElement("p")
                                nextEvName.innerText = data.chain.evolves_to[0].species.name
                            evolutionDiv.appendChild(nextEvName)                            
                            
                            let nextEvImg = document.createElement("img")
                                nextEvImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+evId+".png"
                            evolutionDiv.appendChild(nextEvImg)

                                if (data.chain.evolves_to[0].evolves_to.length >= 1) {
                                    let string2 = data.chain.evolves_to[0].evolves_to[0].species.url
                                    let newString2 = string2.replace('https://pokeapi.co/api/v2/pokemon-species/','');
                                    let evId2 = newString2.replace('/', '')

                                    let lastEvName = document.createElement("p")
                                        lastEvName.innerText = data.chain.evolves_to[0].evolves_to[0].species.name
                                    evolutionDiv.appendChild(lastEvName)

                                    let lastEvImg = document.createElement("img")
                                        lastEvImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+evId2+".png"
                                    evolutionDiv.appendChild(lastEvImg)
                                }}
                })  
}

fetchPokemons()