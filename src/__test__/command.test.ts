import supertest from 'supertest'
import app from '../../src'

import closeConnectionDatabase, {
  connectionDatabase
} from '@config/connectionDatabase'

beforeAll(async () => {
  await connectionDatabase()
})

afterAll(async () => {
  await closeConnectionDatabase()
})

describe('GET /commandByName', () => {
  it('should return a command', async () => {
    const response = await supertest(app).get('/api/v1/command/23213/start')
    expect(response.body.command).toEqual({
      _id: '65cea9a4604f2e27e36d2c15',
      command: 'pepito',
      creator: ' ',
      description: 'xxxx',
      name: 'start',
      type: 'text'
    })
    expect(response.statusCode).toBe(200)
  })

  it('should return a 404', async () => {
    const response = await supertest(app).get('/api/v1/command/23213/start2')
    expect(response.statusCode).toBe(404)
  })
})

describe('POST /addCommand', () => {
  it.skip('should return a chat', async () => {
    const response = await supertest(app).post('/api/v1/command/23213').send({
      name: 'per1245434nn4',
      description: 'prueba',
      type: 'text',
      command: 'lelito',
      creator: 'juanes'
    })
    expect(response.body).toEqual({ message: 'Command Created' })
    expect(response.statusCode).toBe(200)
  })

  it('should return a 409', async () => {
    const response = await supertest(app).post('/api/v1/command/23213').send({
      name: 'start',
      description: 'xxxx',
      type: 'text',
      command: 'xxx',
      creator: 'pepito'
    })
    expect(response.statusCode).toBe(409)
  })

  it('should return a error 400', async () => {
    const response = await supertest(app).post('/api/v1/command/23213').send({
      name: 'start',
      description: 'xxxx',
      type: 'text'
    })
    expect(response.statusCode).toBe(400)
  })
})

describe('PUT /editCommand', () => {
  it('should return a chat', async () => {
    const response = await supertest(app).put('/api/v1/command/23213').send({
      name: 'start',
      description: 'xxxx'
    })
    expect(response.statusCode).toBe(200)
  })

  it('should return a 404', async () => {
    const response = await supertest(app).put('/api/v1/command/23213').send({
      name: 'start2',
      description: 'xxxx'
    })
    expect(response.statusCode).toBe(404)
  })

  it('should return a error 400', async () => {
    const response = await supertest(app).put('/api/v1/command/23213').send({
      description: 'xxxx'
    })
    expect(response.statusCode).toBe(400)
  })
})

describe('PUT /editCommandAll', () => {
  it.skip('should return a chat', async () => {
    const response = await supertest(app).put(
      '/api/v1/command/23213/all/pepito'
    )
    expect(response.body).toEqual({ message: 'username added' })
    expect(response.statusCode).toBe(201)
  })

  it('should return a 404', async () => {
    const response = await supertest(app).put(
      '/api/v1/command/23213/start2/final'
    )
    expect(response.body).toEqual({ error: 'Command not valid' })
    expect(response.statusCode).toBe(400)
  })
})

describe('DELETE /deleteCommand', () => {
  it('should return a chat', async () => {
    const response = await supertest(app).delete('/api/v1/command/23213').send({
      name: 'start'
    })
    expect(response.body).toEqual({ message: 'Command deleted' })
    expect(response.statusCode).toBe(200)
  })

  it('should return a 404', async () => {
    const response = await supertest(app).delete('/api/v1/command/23213').send({
      name: 'start2'
    })
    expect(response.statusCode).toBe(404)
  })
})
