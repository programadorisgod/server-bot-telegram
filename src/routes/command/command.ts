/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  addCommandBot,
  deleteCommandBot,
  editCommandAllBot,
  editCommandBot
} from '@controllers/command/command'
import { Router } from 'express'

const RouterCommand = Router()

const path = '/api/v1/command'

RouterCommand.get(path)
RouterCommand.post(`${path}/:id`, addCommandBot)
RouterCommand.put(`${path}/:id`, editCommandBot)
RouterCommand.put(`${path}/:id/:name_command/:username`, editCommandAllBot)
RouterCommand.delete(`${path}/:id`, deleteCommandBot)

export default RouterCommand
