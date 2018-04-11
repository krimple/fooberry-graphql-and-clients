<template>
  <sui-sidebar-pushable>
    <button @click="toggleSidebar()">Toggle Sidebar</button>
    <sui-sidebar-pusher>
      <Board />
      <MovementBar />
    </sui-sidebar-pusher>
    <sui-sidebar
      :visible="sidebarVisible"
      :width="'wide'">
      <sui-container>sidebar content</sui-container>
    </sui-sidebar>
  </sui-sidebar-pushable>
</template>

<script>
import Board from './Board.vue';
import MovementBar from './MovementBar.vue';
import {Container, Sidebar, SidebarPusher, SidebarPushable} from 'semantic-ui-vue';

export default {
  components: {
    Board,
    MovementBar,
    Sidebar,
    SidebarPushable,
    SidebarPusher,
    Container
  },
  data: function () {
    return {
      sidebarVisible: false
    };
  },
  methods: {
    toggleSidebar: function () {
      this.sidebarVisible = !this.sidebarVisible;
    }
  }
};
</script>

<style scoped>
  .pusher {
    width: 90%;
  }

  .gameboard-row,.gameboard-col {
    padding-top: 0;
    padding-right: 0;
    padding-left: 0;
    padding-bottom: 0;
    margin-top: 0;
    margin-right: 0;
    margin-left: 0;
    margin-bottom: 0;
  }

  img.icon {
    width: 45px;
    height:40px;
    min-height: 40px;
    padding: 1px;
    margin: 0;
  }
</style>
