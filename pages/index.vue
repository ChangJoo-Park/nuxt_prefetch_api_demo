<template>
  <div class="flex flex-row space-x-4">
    <div class="w-60 p-4">
      <div class="font-bold text-xl mb-4">
        <nuxt-link to="/"
          >TODOS
        </nuxt-link>
      </div>
      <div class="font-bold text-xl">
        <nuxt-link to="/dashboard">
          DASHBOARD
        </nuxt-link>
      </div>
    </div>
    <div class="p-4 flex-1">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
});
</script>

<style>
</style>
