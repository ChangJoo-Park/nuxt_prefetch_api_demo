<template>
  <div class="flex flex-row space-x-4">
    <div class="w-60 p-4">
      <div class="font-bold text-xl mb-4">
        <nuxt-link to="/"
          >TODOS
        </nuxt-link>
      </div>
      <div class="font-bold text-xl">
        <nuxt-link to="/dashboard" @mouseenter.native.prevent="onMouseEnterDashboard"
          >DASHBOARD
        </nuxt-link>
      </div>
    </div>
    <div class="p-4 flex-1">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import { defineComponent, useFetch } from "@nuxtjs/composition-api";
import usePrefetchStore from "~/composable/prefetch-store";

export default defineComponent({
  setup() {
    const { fetch: fetchTodos } = useFetch(async () => {
      usePrefetchStore("todos", "/api/todos", {
        resetCache: false,
        ttl: 1000 * 60
      });
    });
    const { fetch: fetchDashboard } = useFetch(async () => {
      usePrefetchStore("dashboard", "/api/dashboard", {
        resetCache: false,
        ttl: 1000 * 60
      });
    })

    const onMouseEnterTodos = () => {
      fetchTodos();
    };

    const onMouseEnterDashboard = () => {
      console.log('called')
      fetchDashboard();
    };
    return { onMouseEnterTodos, onMouseEnterDashboard };
  },
});
</script>

<style>
</style>
