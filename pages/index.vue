<template>
  <div class="flex flex-row space-x-4">
    <div class="w-60 p-4">
      <div class="font-bold text-xl">
        <nuxt-link to="/" @mouseenter.native="onMouseEnter"
          >PREFETCH TODOS
        </nuxt-link>
      </div>
    </div>
    <div class="p-4">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import { defineComponent, useFetch } from "@nuxtjs/composition-api";
import usePrefetchStore from "~/composable/prefetch-store";

export default defineComponent({
  setup() {
    const { fetch } = useFetch(async () => {
      await usePrefetchStore("todos", "/api/todos", {
        resetCache: true,
      });
    });

    const onMouseEnter = () => {
      fetch();
    };

    return { onMouseEnter };
  },
});
</script>

<style>
</style>
