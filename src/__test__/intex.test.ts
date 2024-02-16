import supertest from 'supertest'
import Redis from 'ioredis'
import app from '../../src'

import closeConnectionDatabase, {
  connectionDatabase
} from '@config/connectionDatabase'

let redis: Redis

describe('GET /', () => {
  beforeAll(async () => {
    redis = new Redis({
      host: process.env.HOST,
      port: 50363,
      password: process.env.PASS
    })
    await connectionDatabase()
  })

  it('should return a text/plain', async () => {
    const response = await supertest(app).get('/')
    expect(response.text).toEqual('Hello World!!')
    expect(response.statusCode).toBe(200)
  })

  afterAll(async () => {
    await closeConnectionDatabase()
    await new Promise<void>((resolve, reject) => {
      redis
        .quit((err) => {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
        .catch((err) => {
          console.error(err)
        })
    })
    await new Promise<void>((resolve) => setImmediate(resolve))
  })
})
