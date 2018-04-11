<template>
  <div class="buttons">
    <button @click="movePlayer('north')"><i class="icon arrow up"/></button>
    <button @click="movePlayer('west')"><i class="icon arrow left"/></button>
    <button @click="movePlayer('east')"><i class="icon arrow right"/></button>
    <button @click="movePlayer('south')"><i class="icon arrow down"/></button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    // ...mapState({})
  },
  methods: {
    ...mapActions(['movePlayer'])
  }
};
</script>

<style scoped>

  button {
    width: 50px;
    height: 50px;
  }

  i {
    width: 35px;
    height: 35px;
    text-align: center;
    vertical-align: center;
  }

</style>
