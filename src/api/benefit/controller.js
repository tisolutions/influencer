import { success, notFound } from '../../services/response/'
import { Benefit } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Benefit.create(body)
    .then((benefit) => benefit.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Benefit.find(query, select, cursor)
    .then((benefits) => benefits.map((benefit) => benefit.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Benefit.findById(params.id)
    .then(notFound(res))
    .then((benefit) => benefit ? benefit.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Benefit.findById(params.id)
    .then(notFound(res))
    .then((benefit) => benefit ? Object.assign(benefit, body).save() : null)
    .then((benefit) => benefit ? benefit.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Benefit.findById(params.id)
    .then(notFound(res))
    .then((benefit) => benefit ? benefit.remove() : null)
    .then(success(res, 204))
    .catch(next)
