<template>
  <div id="app">
    <mheader></mheader>
    <tab></tab>
    <transition>
      <router-view/>
    </transition>
    <!-- player -->
    <player></player>
  </div>
</template>

<script>
import mheader from '@/components/header.vue';
import tab from '@/components/tab.vue';
import Player from '@/components/player';
export default {
  name: 'App',
  components:{
    Player,
    mheader,
    tab
  }
}
</script>

<style>

</style>
