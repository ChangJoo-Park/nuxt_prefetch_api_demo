<template>
  <div>
    <div v-if="fetchState.pending">Loading...</div>
    <div v-else>
      <div class="text-lg font-bold">
        {{ todo.title }}
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
  useContext,
  useFetch,
  useRoute,
} from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    let todo = ref(null);
    const { $axios } = useContext();
    const $route = useRoute();
    const { fetch, fetchState } = useFetch(async () => {
      todo.value = await $axios.$get(`/todos/${$route.value.params.task}`);
    });

    fetch();

    return { todo, fetchState };
  },
});
</script>

<style>
</style>