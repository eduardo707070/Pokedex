const API_POKEMONS = "https://pokeapi.co/api/v2/pokemon/?limite=1302&offsset-0";
const API_DE_IMAGENS = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"

let apiPagProximo = "";
let apiPagAnterior = "";

let pokemons = [];

const loading = document.createElement("div")

loading.classList.add("loader");
document.addEventListener("DOMContentLoaded", function () {

    const caixaPokemons = document.getElementById("caixaPokemons");
    const btnAnterior = document.getElementById("btnAnterior");
    const btnProximo = document.getElementById("btnProximo");

    buscarPokemons(API_POKEMONS)
    btnAnterior.addEventListener("click", () => {
        if (apiPagAnterior) buscarPokemons(apiPagAnterior)
    })

    btnProximo.addEventListener("click", () => {
        if (apiPagProximo) buscarPokemons(apiPagProximo)
    });
    function buscarPokemons(url) {
        pokemons = [];
        caixaPokemons.innerText = "";
        caixaPokemons.append(loading);

        fetch(url, { headers: { accept: "*" } })
            .then(resposta => resposta.json())
            .then(respostaApi => {

                const { count , next, previous, results } = respostaApi;

                if (previous) {
                    apiPagAnterior = previous

                } else {
                    apiPagAnterior = ""

                }
                if (next) {
                    apiPagProximo = next

                } else {
                    apiPagProximo = ""

                }


                if(results.length){
    
                    pokemons = results

                }

                pokemons.forEach(pokemon =>{
                    const urlImagemPokemon = API_DE_IMAGENS + pokemon.url.split("pokemon")[1].slice(0,-1) + ".png"
                    const divDoPokemon = document.createElement("div");
                    const nomeDoPokemon = document.createElement("h3");
                    const imagemDoPokemon = document.createElement("img");
                imagemDoPokemon.height = 96
                imagemDoPokemon.width = 96
                imagemDoPokemon.src = urlImagemPokemon;

                nomeDoPokemon.innerText = pokemon.name
                divDoPokemon.append(nomeDoPokemon)
                divDoPokemon.append(imagemDoPokemon)

                caixaPokemons.append(divDoPokemon)

                })

            })

    }



})

