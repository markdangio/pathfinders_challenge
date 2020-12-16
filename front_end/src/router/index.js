import Vue from 'vue';
import VueRouter from 'vue-router';
import DataInput from '../components/DataInput.vue';
import Results from '../components/Results.vue';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'DataInput',
    component: DataInput,
  },
  {
    path: '/results/:value',
    name: 'Results',
    component: Results,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
