<template>
  <div>
    <ul class="flex flex-col space-y-2">
      <li
        class="transition-all duration-200 cursor-pointer border rounded px-4 hover:shadow hover:bg-gray-200"
        v-for="todo in todos"
        :key="todo.id"
      >
        <nuxt-link
          :to="`/${todo.id}`"
          prefetch
          class="flex flex-row space-x-4 items-center"
        >
          <div
            class="border rounded-lg w-6 h-6 hover:border-indigo-800 hover:text-indigo-600 border-gray-600 text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              v-if="todo.completed"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div class="py-4">{{ todo.title }}</div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
} from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    let todos = ref([]);
    const { $axios } = useContext();
    const { fetch } = useFetch(async () => {
      todos.value = await $axios.$get("/todos");
    });

    fetch();

    return { todos };
  },
});
</script>

<style>
</style>