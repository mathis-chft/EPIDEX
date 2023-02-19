<script setup>
// importer les composants

import { reactive, onMounted, ref } from "vue";
import axios from "axios";
import PokemonCard from "../components/PokemonCard.vue";
import PokemonModal from "../components/PokemonModal.vue";

// définir les attributs

const isPokemonModalActive = ref(false);
const urlPokemon = ref("");
const pokemons = ref([]);
const state = reactive({ pokemons });

// ouvrir la card d'un pokemon

function openModal(url) {
  urlPokemon.value = url;
  isPokemonModalActive.value = true;
}

// faire des équipes de 6 pokemons aléatoirement

function randomTeam() {
  let team = [];
  for (let i = 0; i < 6; i++) {
    let random = Math.floor(Math.random() * 151);
    team.push(state.pokemons[random]);
  }
  return team;
}

// charger les pokemons

function loadPokemons() {
  axios
    .get("https://pokeapi.co/api/v2/pokemon/?limit=151") // lien de l'api
    .then((response) => {
      console.log(response.data);
      state.pokemons = response.data.results;
    });
}

// charger uniquement les pokémons quand ils sont tous "montés" (chargés)

onMounted(() => {
  loadPokemons();
});

//cherche un pokemon avec la barre de recherche (non fonctionnel)

function searchPokemon() {
  let input = document.getElementById("form1");
  let filter = input.value.toUpperCase();
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    let name = cards[i].getElementsByClassName("card-title")[0];
    if (name.innerHTML.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}

</script>

<!-- contenir toutes les cards dans le meme container -->

<template>


  <div id="rendered-content">
      <div>
        <router-link to="/signin"
        style="margin-left: 80% !important; 
        height: 28px !important; 
        width: 49px !important;">Sign In</router-link>
        
        
        <router-link to="/signup" 
        style="margin-left: 2% !important; 
            height: 28px !important; 
            width: 49px !important;">Sign Up</router-link>

      </div>
  </div>

  <div class="input-group">
    <div class="form-outline">
      <input
        type="search"
        id="form1"
        class="form-control"
        style="
          margin-left: 154px !important;
          padding-left: 10px !important;
          height: 31px !important;
          font
        "
      />
      <label class="form-label" 
      for="form1" 
      style="padding-left: 10px !important; font-family : 'Roboto', sans-serif !important; 
      font-size: 14px !important; 
      font-weight: 400 !important;"
      >Search</label>
    </div>
  </div>



  <div class="container-grid">
    <PokemonCard
      @click="openModal(pokemon.url)"
      v-for="(pokemon, index) in pokemons"
      :key="index"
      :name="pokemon.name"
      :image="pokemon.url"
    ></PokemonCard>
  </div>
  <PokemonModal
    v-if="isPokemonModalActive"
    @closeModal="isPokemonModalActive = false"
    :url="urlPokemon"
  ></PokemonModal>
</template>

<!-- style de l'interface (appliqué uniquement sur ce component grâce au scope)-->

<style scoped>

.input {
  background-color: aqua;
}
.input-group {
  color: black;
}

.form-label {
  color: black;
}
.container-grid {
  padding: 10px;
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
</style>
