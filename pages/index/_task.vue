<template>
  <div>
    <div v-if="$fetchState.pending">Loading...</div>
    <div v-else>
      <div class="text-lg font-bold">
        {{ todo.id }} - {{ todo.title }}
      </div>
      <div>
        <button v-if="todo.completed" class="border border-gray-900 rounded px-4 py-2">
          <span >Completed</span>
        </button>
        <button v-else class="border border-gray-900 rounded px-4 py-2">
          <span >Todo</span>
        </button>
      </div>
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

    const { fetch } = useFetch(async () => {
      const id = $route.value.params.task
      const key = `todo-${id}`
      const url = `/api/todos/${id}`
      console.log(`[🕸][todo-${id}][TODO] USE PREFETCH STORE START`)
      const { data } = await usePrefetchStore(key, url)
      console.log(`[🕸][todo-${id}][TODO] USE PREFETCH STORE END`)
      todo.value = data
    })

    fetch();

    return { todo };
  },
});
</script>

<style>
</style>