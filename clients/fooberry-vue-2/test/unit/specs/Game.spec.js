import Vue from 'vue';
import Game from '@/components/Game';
import configureStore from '@/vuex/configureStore';

const store = configureStore();
Vue.use(store);

describe('Game.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Game);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('h1').textContent)
      .to.equal('Game');
  });
});
