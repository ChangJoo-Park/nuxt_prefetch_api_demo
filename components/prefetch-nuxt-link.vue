<template>
  <nuxt-link :to="to" @mouseenter.native="onMouseEnter">
    <slot />
  </nuxt-link>
</template>

<script>
import { defineComponent, useContext } from "@nuxtjs/composition-api"
import usePrefetchStore from '@/composable/prefetch-store'

export default defineComponent({
  props: {
    to: [String, Object],
    api: [String]
  },
  setup (props) {
    const onMouseEnter = () => {
      console.log('mouse enter')
      console.log(props.api)
      const result = usePrefetchStore(props.api)
      // useMouseHover(() => {
      //   console.log('run ', to)
      // })
    }
    return { onMouseEnter }
  }
})
</script>

<style>

</style>