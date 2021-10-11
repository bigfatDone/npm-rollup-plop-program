import * as components from './components';

const install = (app, opt = {}) => {
  
  Object.keys(components).forEach((c) => {
    app.use(components[c]);
  });

  sessionStorage.setItem('oppein-pc-ui/env', opt.env);
};

export default { install };
