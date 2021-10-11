import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

import path from 'path';
import { getPackagesSync } from '@lerna/project';
import pkg from '../package.json';

const noElPrefixFile = /(utils|directives|hooks|locale)/;
const getOutFile = (name, dir = 'lib') => {
  const compName = name.split('@pc-component/')[1];
  if (noElPrefixFile.test(name)) {
    return `${dir}/${compName}/index.js`;
  }
  return `${dir}/op-${compName}/index.js`;
};
const deps = Object.keys(pkg.dependencies);
const inputs = getPackagesSync()
  .map((pkg) => pkg.name)
  .filter((name) => name.includes('@pc-component'));
export default inputs.map((name) => ({
  input: path.resolve(__dirname, `../packages/${name.split('@pc-component/')[1]}/index.js`),
  output: [
    {
      format: 'es',
      file: getOutFile(name, 'es'),
      paths(id) {
        if (/^@pc-component/.test(id)) {
          if (noElPrefixFile.test(id)) return id.replace('@pc-component', '..');
          return id.replace('@pc-component/', '../op-');
        }
      },
    },
    {
      format: 'cjs',
      file: getOutFile(name, 'lib'),
      exports: 'named',
      paths(id) {
        if (/^@pc-component/.test(id)) {
          if (noElPrefixFile.test(id)) return id.replace('@pc-component', '..');
          return id.replace('@pc-component/', '../op-');
        }
      },
    },
  ],
  plugins: [
    json(),
    alias({
      entries: {
        ['@']: path.resolve(__dirname, '../', 'src'),
        ['~']: path.resolve(__dirname, '../', 'packages'),
      },
    }),
    css({
      output: 'index.css',
    }),
    vue({
      css: false,
    }),
    nodeResolve({ preferBuiltins: false }),
    commonjs({
      sourceMap: false,
    }),
    babel({ babelHelpers: 'runtime' }),
  ],
  external(id) {
    return /^vue/.test(id) || /^@pc-component/.test(id) || deps.some((k) => new RegExp('^' + k).test(id));
  },
}));
