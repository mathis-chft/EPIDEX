<script setup>

// importer les composants

import axios from "axios";
import { onMounted, ref } from "vue";

// définir les attributs

const isLoaded = ref(false);
const props = defineProps({
  url: String,
});
const pokemonData = ref({});
const emit = defineEmits(["closeModal"]);

// fermer la carte du pokemon

function click(event) {
  if (event.target.id == "modal") {
    emit("closeModal");
  }
}

// on charge les données

onMounted(() => {
  axios
    .get(props.url)
    .then((response) => {
      console.log(response.data);
      pokemonData.value = response.data;
    })

// on affiche les données si, et seulement si elles sont toutes déjà chargées

    .then(() => {
      isLoaded.value = true;
    });
});
</script>

<template>

<!-- afficher les données des pokémons dans la vue de la carte -->

  <transition name="fade">
    <div id="modal" class="Modal" @click="click">
      <div class="ModalContent">
        <div v-if="isLoaded">
          <div class="modal-image">
<!-- image du pokemon sur la carte -->
            <img
              class="pokemon-image"
              :src="pokemonData.sprites.other.home.front_default"
              width="200"
              height="200"/>
<!-- nom du pokemon sur la carte -->
          </div>
          <div class="pokemon-title">
            <h2>{{ pokemonData.name }}</h2> <!-- en tant que String -->
          </div>
<!-- id du pokemon sur la carte -->
          <div class="pokemon-id">
              <div class="description">id</div>
              <div class="value">{{ pokemonData.id}}</div>
            </div>
<!-- taille du pokemon sur la carte -->
          <div class="pokemon-stats">
            <div class="pokemon-height">
              <div class="description">Height</div>
              <div class="value">{{ pokemonData.height / 10 }} m</div> <!-- en mètres -->
            </div>
<!-- poids du pokemon sur la carte -->
            <div class="pokemon-weight">
              <div class="description">Weight</div>
              <div class="value">{{ pokemonData.weight / 10 }} kg</div> <!-- en kilogrammes -->
            </div>
<!-- type du pokemon sur la carte -->
            <div class="pokemon-types">
              <div class="description">Type</div> 
              <div class="value">
                <p v-for="(type, index) in pokemonData.types" 
                  style="text-transform: capitalize"> 
                  {{ type.type.name }} <!-- en tant que String -->
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<!-- style de l'interface (appliqué uniquement sur ce component grâce au scope)-->

<style scoped>
.Modal {
  width: 100%;
  height: 100%;
  background-color: #00000082;
  top: 0;
  position: fixed;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto";
}

.ModalContent {
  width: 50%;
  height: 80%;
  background-color: white;
  border-radius: 40px;
  padding: 20px;
}
.modal-image {
  text-align: center;
}
.modal-image > img {
  transform: translateY(-16px);
}

.pokemon-title {
  text-transform: capitalize;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  font-family: "Roboto";
  margin-bottom: 60px;
}

.pokemon-stats {
  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: 1fr 1fr;
}

.pokemon-base-experience {
  grid-column-start: 1;
  grid-column-end: 3;
}

.description {
  font-weight: bold;
}

.pokemon-image {
  filter: drop-shadow(2px 4px 8px hsla(0deg, 0%, 0%, 30%));
}
</style>
