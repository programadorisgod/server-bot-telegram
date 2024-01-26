import Redis from 'ioredis'
import { config } from 'dotenv'
config()

const redis = new Redis({
  host: process.env.host,
  port: 57684,
  password: process.env.password
})

export default redis
