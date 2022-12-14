<script setup>

// importer les composants

import { onMounted, reactive, ref } from "vue";
import axios from "axios";

// définir les props

const pokemonData = ref(undefined);
const props = defineProps({
  name: String,
  image: String,
});
const state = reactive({
  pokemonData,
});

// obtenir les data des pokemons

function getPokemon() {
  axios.get(props.image).then((response) => {
    state.pokemonData = response.data;
  });
}
onMounted(() => {
  getPokemon();
});
</script>

<!-- defintion des photos des props -->

<template>
  <div v-if="pokemonData != undefined" class="PokemonCard">
    <img
      :src="pokemonData.sprites.other.home.front_default"
      width="80"
      height="80"
    />
    <h3>{{ pokemonData.name }}</h3>
  </div>
</template>


<!-- style de l'interface (appliqué uniquement sur ce component grâce au scope)-->

<style scoped>
.PokemonCard {
  border-radius: 30px;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-box-shadow: 5px 5px 14px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 5px 5px 14px 4px rgba(0, 0, 0, 0.2);
  max-height: 144px;
}

h3 {
  font-family: "Roboto";
  font-weight: 900;
  text-transform: capitalize;
  padding: 17px;
  padding-bottom: 41px;
}

img,
h3 {
  position: relative;
  top: 10%;
}
</style>
