<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex-shrink-0 flex items-center">
              <div
                class="bg-indigo-500 rounded-full p-2 flex items-center justify-center"
              >
                <img
                  class="h-8 w-auto"
                  src="../src/assets/recipe.png"
                  alt="Recipe App Logo"
                />
              </div>
            </router-link>
            <div class="mt-4 md:mt-0 ml-4 sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                to="/"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition duration-300"
                :class="{
                  'border-indigo-500 text-indigo-500': $route.path === '/',
                  'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-300':
                    $route.path !== '/',
                }"
              >
                Home
              </router-link>
              <router-link
                to="/favorites"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition duration-300"
                :class="{
                  'border-indigo-500 text-indigo-500':
                    $route.path === '/favorites',
                  'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-300':
                    $route.path !== '/favorites',
                }"
              >
                Favorites
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style scoped></style>
