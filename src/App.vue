<template>
  <div id="app">
    <transition>
      <router-view/>
    </transition>
    <!-- player -->
    <player></player>
  </div>
</template>

<script>
import Player from '@/components/player';
export default {
  name: 'App',
  components:{
    Player
  }
}
</script>

<style>

</style>
