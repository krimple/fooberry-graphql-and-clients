import VueRouter from 'vue-router';
import Game from '../components/Game';

export default new VueRouter({
  routes: [
    {
      path: '/game',
      component: Game
    }
  ],
  default: '/'
});
