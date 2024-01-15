import express, { json, urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { findPort } from '@config/findPort'
import routerChat from '@routes/chat/chat'
import { connectionDatabase } from '@config/connectionDatabase'
import RouterCommand from '@routes/command/command'

const PORT = process.env.PORT ?? 3000
const app = express()

app.disable('x-powered-by')
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (_, res) => {
  res.send('Hello World!!')
})

app.use(routerChat)
app.use(RouterCommand)

connectionDatabase()

findPort(PORT).then((port) => {
  app.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Server running on port http://localhost:${port}`)
    }
  })
})
