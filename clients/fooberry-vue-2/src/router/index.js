import VueRouter from 'vue-router';
import ApolloLinkWsSample from '../components/ApolloLinkWsSample';
import Game from '../components/Game';

// import Game from '../components/Game';

// const Home = { template: '<p>Click on "Game" to start!</p>' };

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: ApolloLinkWsSample
    },
    {
      path: '/game',
      component: Game
    }
  ],
  default: '/'
});
