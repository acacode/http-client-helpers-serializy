const packageJson = require('./package.json')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const terser = require('rollup-plugin-terser').terser
// const commonjs = require('rollup-plugin-commonjs')

const deps = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
]

const inputOutputConfig = (outputFile, outputFormat, commonOutput = {}) => ({
  input: 'src/index.js',
  output: {
    file: `${outputFile}`,
    format: outputFormat,
    ...commonOutput,
  },
})

const productionBuildPlugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  terser({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false,
      arguments: true,
      toplevel: true,
      unsafe_Function: true,
      module: true,
      unsafe_proto: true,
    },
    mangle: {
      properties: {
        reserved: [
          'deserializeRequestData',
          'serializeResponseData',
          'deserialize',
          'serialize',
          'method',
          'url',
          'isError',
          'errorModel',
          'error',
          'HttpHelpersSerializy',
        ],
      },
      module: true,
      toplevel: true,
    },
  }),
]

module.exports = [
  // Common JS builds
  {
    ...inputOutputConfig('lib/http-helpers-serializy.js', 'cjs'),
    external: deps,
    plugins: [babel()],
  },
  {
    ...inputOutputConfig('lib/http-helpers-serializy.min.js', 'cjs'),
    external: deps,
    plugins: [babel(), ...productionBuildPlugins],
  },

  // EcmaScript builds
  {
    ...inputOutputConfig('es/http-helpers-serializy.js', 'es'),
    external: deps,
    plugins: [babel()],
  },
  {
    ...inputOutputConfig('es/http-helpers-serializy.mjs', 'es'),
    external: deps,
    plugins: [resolve(), babel(), ...productionBuildPlugins],
  },

  // UMD builds
  {
    ...inputOutputConfig('dist/http-helpers-serializy.js', 'umd', {
      name: 'HttpHelpersSerializy',
    }),
    external: deps,
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
  },
  {
    ...inputOutputConfig('dist/http-helpers-serializy.min.js', 'umd', {
      name: 'HttpHelpersSerializy',
    }),
    external: deps,
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
      ...productionBuildPlugins,
    ],
  },
]
