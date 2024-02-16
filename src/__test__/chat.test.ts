import app from '../../src'
import supertest from 'supertest'
import closeConnectionDatabase, {
  connectionDatabase
} from '@config/connectionDatabase'

beforeAll(async () => {
  await connectionDatabase()
})

afterAll(async () => {
  await closeConnectionDatabase()
})

describe('GET /chatById', () => {
  it('should return a chat', async () => {
    const responseExpected = {
      chatId: 23213,
      list: [
        {
          _id: '65cea9a4604f2e27e36d2c15',
          command: ' ',
          creator: ' ',
          description: ' ',
          name: 'start',
          type: 'text'
        },
        {
          _id: '65cea9a4604f2e27e36d2c16',
          command: ' ',
          creator: ' ',
          description: ' ',
          name: 'help',
          type: 'text'
        },
        {
          _id: '65cea9a4604f2e27e36d2c17',
          command: ' ',
          creator: ' ',
          description: ' ',
          name: 'purge',
          type: 'any'
        },
        {
          _id: '65cea9a4604f2e27e36d2c18',
          command: ' ',
          creator: ' ',
          description: ' ',
          name: 'alias',
          type: 'text'
        },
        {
          _id: '65cea9a4604f2e27e36d2c19',
          command: ' ',
          creator: ' ',
          description: ' ',
          name: 'remove',
          type: 'text'
        },
        {
          _id: '65cea9a4604f2e27e36d2c1a',
          command: ' ',
          creator: ' ',
          description: ' ',
          name: 'risa',
          type: 'text'
        },
        {
          _id: '65cea9a4604f2e27e36d2c1b',
          command: ' ',
          creator: ' ',
          description: ' ',
          name: 'all',
          type: 'text'
        },
        {
          _id: '65cea9a4604f2e27e36d2c1c',
          command: ' ',
          creator: ' ',
          description: ' ',
          name: 'tr',
          type: 'text'
        }
      ],
      _id: '65cea9a4604f2e27e36d2c14',
      __v: 0
    }
    const response = await supertest(app).get('/api/v1/chat/23213')
    expect(response.body).toEqual(responseExpected)
    expect(response.statusCode).toBe(200)
  })

  it('should return a error 404', async () => {
    const response = await supertest(app).get('/api/v1/chat/2324')
    expect(response.statusCode).toBe(404)
  })
})
