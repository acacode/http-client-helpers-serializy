<div align="center">

  <h1>Helpers for integration serializy with http web clients </h1>

  [![](https://img.shields.io/badge/license-MIT-red.svg)](./LICENSE)
  [![](https://img.shields.io/npm/v/http-helpers-serializy.svg)](https://www.npmjs.com/package/http-helpers-serializy)
  [![](https://img.shields.io/travis/acacode/http-helpers-serializy.svg)](https://travis-ci.org/acacode/http-helpers-serializy)
  [![](https://www.codefactor.io/repository/github/acacode/http-helpers-serializy/badge/master)](https://www.codefactor.io/repository/github/acacode/http-helpers-serializy/overview/master)
  [![](https://img.shields.io/npm/dm/http-helpers-serializy.svg)](http://npm-stat.com/charts.html?package=http-helpers-serializy)
  [![](https://badgen.net/bundlephobia/min/http-helpers-serializy)](https://bundlephobia.com/result?p=http-helpers-serializy)
  [![](https://badgen.net/bundlephobia/minzip/http-helpers-serializy)](https://bundlephobia.com/result?p=http-helpers-serializy)

  <p>
    HTTP client helpers serializy
  </p>
</div>

## 🚀 Installation

    $ npm i -S http-helpers-serializy
    # or using yarn
    $ yarn add http-helpers-serializy

## 📚 Usage  

```js

import {
  deserializeRequestData,
  serializeResponseData,
} from 'http-helpers-serializy'
import { field, model } from 'serializy'

const SerializyModel = model({
  foo: field('Foo', 'any'),
})

const ErrorModel = model({
  message: field(e => (e ? JSON.stringify(e) : '')),
})

const structure = { Foo: '12345' }

const method = 'get'
const url = 'https://api.com/my-data'

const { data } = deserializeRequestData(SerializyModel, structure, {
  method,
  url,
})

// ...

const { data, error } = serializeResponseData(SerializyModel, structure, {
  method,
  url,
  isError: false,
  errorModel: ErrorModel,
  error: { message: 'bad response' },
})
```  

## 📝 License

Licensed under the [MIT License](./LICENSE).
