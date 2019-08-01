<div align="center">

  <h1>Helpers for integration serializy with http web clients </h1>

  [![](https://img.shields.io/badge/license-MIT-red.svg)](./LICENSE)
  [![](https://img.shields.io/npm/v/http-client-helpers-serializy.svg)](https://www.npmjs.com/package/http-client-helpers-serializy)
  [![](https://img.shields.io/travis/acacode/http-client-helpers-serializy.svg)](https://travis-ci.org/acacode/http-client-helpers-serializy)
  [![](https://www.codefactor.io/repository/github/acacode/http-client-helpers-serializy/badge/master)](https://www.codefactor.io/repository/github/acacode/http-client-helpers-serializy/overview/master)
  [![](https://img.shields.io/npm/dm/http-client-helpers-serializy.svg)](http://npm-stat.com/charts.html?package=http-client-helpers-serializy)
  [![](https://badgen.net/bundlephobia/min/http-client-helpers-serializy)](https://bundlephobia.com/result?p=http-client-helpers-serializy)
  [![](https://badgen.net/bundlephobia/minzip/http-client-helpers-serializy)](https://bundlephobia.com/result?p=http-client-helpers-serializy)

  <p>
    HTTP client helpers serializy
  </p>
</div>

## 🚀 Installation

    $ npm i -S http-client-helpers-serializy
    # or using yarn
    $ yarn add http-client-helpers-serializy

## 📚 Usage  

```js

import {
  deserializeRequestData,
  serializeResponseData,
} from 'http-client-helpers-serializy'
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
