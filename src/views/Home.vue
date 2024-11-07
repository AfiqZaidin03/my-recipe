<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Recipes</h1>
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search recipes..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import RecipeCard from "../components/RecipeCard.vue";

export default defineComponent({
  name: "Home",
  components: {
    RecipeCard,
  },
  setup() {
    return {};
  },
});
</script>
