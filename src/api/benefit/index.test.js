import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Benefit } from '.'

const app = () => express(apiRoot, routes)

let benefit

beforeEach(async () => {
  benefit = await Benefit.create({})
})

test('POST /benefits 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, description: 'test', title: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.description).toEqual('test')
  expect(body.title).toEqual('test')
})

test('POST /benefits 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /benefits 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /benefits/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${benefit.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(benefit.id)
})

test('GET /benefits/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /benefits/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${benefit.id}`)
    .send({ access_token: masterKey, description: 'test', title: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(benefit.id)
  expect(body.description).toEqual('test')
  expect(body.title).toEqual('test')
})

test('PUT /benefits/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${benefit.id}`)
  expect(status).toBe(401)
})

test('PUT /benefits/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, description: 'test', title: 'test' })
  expect(status).toBe(404)
})

test('DELETE /benefits/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${benefit.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /benefits/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${benefit.id}`)
  expect(status).toBe(401)
})

test('DELETE /benefits/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
