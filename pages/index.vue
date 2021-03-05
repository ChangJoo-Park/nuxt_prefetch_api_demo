<template>
  <div class="flex flex-row space-x-4">
    <div class="w-60 p-4">
      <div class="font-bold text-xl mb-4">
        <nuxt-link to="/" @mouseenter.native.prevent="onMouseEnterTodos"
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
      await usePrefetchStore("todos", "/api/todos", {
        resetCache: true,
      });
    });
    const { fetch: fetchDashboard } = useFetch(async () => {
      await usePrefetchStore("dashboard", "/api/dashboard", {
        resetCache: false,
        ttl: 1000 * 60
      });
    })

    const onMouseEnterTodos = () => {
      fetchTodos();
    };

    const onMouseEnterDashboard = () => {
      fetchDashboard();
    };
    return { onMouseEnterTodos, onMouseEnterDashboard };
  },
});
</script>

<style>
</style>
