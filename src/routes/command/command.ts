/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  addCommandBot,
  deleteCommandBot,
  editCommandAllBot,
  editCommandBot,
  getCommandByNameBot
} from '@controllers/command/command'
import { validateData } from '@middlewares/validation/validateBody'
import { Router } from 'express'

const RouterCommand = Router()

const path = '/api/v1/command'

RouterCommand.get(`${path}/:id_chat/:name_command`, getCommandByNameBot)
RouterCommand.post(`${path}/:id_chat`, validateData, addCommandBot)
RouterCommand.put(`${path}/:id_chat`, editCommandBot)
RouterCommand.put(`${path}/:id_chat/:name_command/:username`, editCommandAllBot)
RouterCommand.delete(`${path}/:id_chat`, deleteCommandBot)

export default RouterCommand
