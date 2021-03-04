<template>
  <div>
    <div v-if="fetchState.pending">Loading...</div>
    <div v-if="todo">
      <div class="text-lg font-bold">
        {{ todo.id }} - {{ todo.title }}
      </div>
      <div>
        <span v-if="todo.completed" class="rounded px-4 py-2">
          Completed
        </span>
        <span class="rounded px-4 py-2">
          Todo
        </span>
      </div>
    </div>

    <div>
      <nuxt-link to="/" class="mr-4">
        Back to main
      </nuxt-link>
      <nuxt-link to="/" class="mr-4" @mouseenter.native="onMouseEnter">
        Back to main with prefetch
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  useFetch,
  useRoute,
} from "@nuxtjs/composition-api";
import usePrefetchStore from "~/composable/prefetch-store";

export default defineComponent({
  setup() {
    let todo = ref(null);
    const $route = useRoute();

    const { fetch, fetchState } = useFetch(async () => {
      const id = $route.value.params.task
      const key = `todo-${id}`
      const url = `/api/todos/${id}`
      console.log(`[🕸][todo-${id}][TODO] USE PREFETCH STORE START`)
      const { data } = await usePrefetchStore(key, url)
      console.log(`[🕸][todo-${id}][TODO] USE PREFETCH STORE END`)
      todo.value = data
    })

    fetch();

    const { fetch: fetchTodos } = useFetch(async () => {
      await usePrefetchStore("todos", "/api/todos");
    });

    const onMouseEnter = () => {
      fetchTodos();
    };

    return { fetchState, todo, onMouseEnter };
  },
});
</script>

<style>
</style>
