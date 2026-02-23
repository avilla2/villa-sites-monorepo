import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import css from 'rollup-plugin-css-only'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      exports: 'named'
    }
  ],
  onwarn (warning, warn) {
    // Suppress "use client" directive warnings from MUI v7
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
      return
    }
    warn(warning)
  },
  plugins: [
    css({ output: 'bundle.css' }),
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.json'],
      preferBuiltins: false
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      extensions: ['.js', '.jsx']
    })
  ],
  external: (id) => {
    // Externalize all MUI packages and subpaths
    if (id.startsWith('@mui/') || id.startsWith('@emotion/')) {
      return true
    }
    // Externalize other peer dependencies
    const peerDeps = [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react-router',
      'react-markdown'
    ]
    return peerDeps.some(dep => id === dep || id.startsWith(dep + '/'))
  }
}
