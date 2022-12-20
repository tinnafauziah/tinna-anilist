import { createLocalVue, shallowMount, mount, RouterLinkStub } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

global.localVue = createLocalVue();

global.createStore = (paramModule = {}) => {
  const modules = {
    ...paramModule,
  };
  global.localVue.use(Vuex);
  return new Vuex.Store({ modules });
};

global.shallowMount = (Component, componentParam) => {
  Vue.use(Vuetify);
  return shallowMount(Component, {
    localVue: global.localVue,
    stubs: {
      NoSsr: true,
      Portal: true,
      PortalTarget: true,
      NuxtChild: true,
      NuxtLink: RouterLinkStub,
      nuxt: true,
    },
    ...componentParam,
  });
};

global.mount = (Component, componentParam) => {
  Vue.use(Vuetify);
  return mount(Component, {
    localVue: global.localVue,
    ...componentParam,
  });
};
