import Module from './src/index.vue';

Module.install = (Vue) => {
	Vue.component(Module.name, Module);
};

export default Module