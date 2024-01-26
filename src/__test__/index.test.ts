import supertest from 'supertest'
import app from '../../src'
import closeConnectionDatabase, {
  connectionDatabase
} from '@config/connectionDatabase'

describe('GET /', () => {
  beforeAll(async () => {
    await connectionDatabase()
  })

  it('should return a text/plain', async () => {
    const response = await supertest(app).get('/')
    expect(response.text).toEqual('Hello World!!')
    expect(response.statusCode).toBe(200)
  })

  afterAll(async () => {
    await closeConnectionDatabase()
  })
})
