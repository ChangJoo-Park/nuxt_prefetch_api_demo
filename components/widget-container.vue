<template>
  <div
    class="group transition-all duration-200 border-2 rounded hover:border-transparent hover:shadow-xl bg-white items-center"
  >
    <div class="mb-2 font-bold text-lg border-b px-2 py-2">
      {{ title }}
    </div>
    <div class="px-2 py-2">
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    title: {
      type: String,
    }
  },
  setup() {

  }
})
</script>

<style>

</style>
