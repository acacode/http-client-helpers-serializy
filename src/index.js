/**
 * Copyright (c) acacode, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict'

const invalidModelError = (method, url) => {
  throw new Error(
    `Property "model" for request ${method.toUpperCase()}:${url} is not valid`
  )
}

const transformData = (data, transformFunc) =>
  data instanceof Array ? data.map(transformFunc) : transformFunc(data)

export const deserializeRequestData = (model, data, { method, url }) => {
  if (model && data && typeof data === 'object') {
    if (!model.deserialize) {
      invalidModelError(method, url)
    }

    data = transformData(data, model.deserialize)
  }

  return { data }
}

export const serializeResponseData = (
  model,
  data,
  { method, url, isError, errorModel, error }
) => {
  let serializedError = error

  if (isError) {
    if (errorModel) serializedError = errorModel.serialize(error)
  } else if (model) {
    if (!model.serialize) {
      invalidModelError(method, url)
    }

    data = transformData(data, model.serialize)
  }

  return { data, error: serializedError }
}
