import supertest from 'supertest'
import app from '../../src'
import { connectionDatabase } from '@config/connectionDatabase'



describe('GET /', () => {
  it('should return a text/plain', async () => {
    const response = await supertest(app).get('/')
    await connectionDatabase()
    expect(response.text).toEqual('Hello World!!')
    expect(response.statusCode).toBe(200)
  })
})
