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
          @mouseenter.native="onMouseEnter(todo)"
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
          <div class="py-4">
            {{ todo.title }}

            <span class="font-uppercase" v-if="todo.id === 1">THIS LINK DOES NOT USE PREFETCH API</span>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api"
import useTodos from '~/composable/use-todos'
import useTodo from '~/composable/use-todo'

export default defineComponent({
  setup() {
    const { data: todos } = useTodos()

    const onMouseEnter = (todo) => {
      if (todo.id === 1) {
        return
      }
      try {
        // FIXME: Error on getCurrentInstance
        useTodo(todo.id)
      } catch (error) {
        console.error(error)
      }
    }

    return { todos, onMouseEnter }
  }
})
</script>

<style>
</style>
