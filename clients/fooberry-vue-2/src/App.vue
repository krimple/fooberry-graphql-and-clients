<template>
  <div id="app">
    <sui-menu>
      <sui-container
        fluid
        text-align="center">
        <sui-menu-item>
          <router-link to="/game">Fooberry</router-link>
        </sui-menu-item>
        <sui-menu-item>
          <router-link to="/apollo">Apollo</router-link>
        </sui-menu-item>
      </sui-container>
    </sui-menu>
    <router-view />
  </div>
</template>

<script>
import {Container, Menu, MenuItem, MenuMenu} from 'semantic-ui-vue';

export default {
  components: {
    Container,
    Menu,
    MenuItem,
    MenuMenu
  }
};
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: auto;
  }
</style>
