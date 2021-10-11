module.exports = (plop) => {
  plop.setGenerator('start', {
    description: '将创建一个新的项目',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '项目名称',
        default: 'demo',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{name}}/__test__/index.js',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/src/index.vue',
        templateFile: 'plop-templates/vue-template.vue.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/index.js',
        templateFile: 'plop-templates/index-template.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/package.json',
        templateFile: 'plop-templates/package-template.json.hbs',
      },
    ],
  });
};
