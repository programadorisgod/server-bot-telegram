/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  addCommandBot,
  deleteCommandBot,
  editCommandAllBot,
  editCommandBot,
  getCommandByNameBot
} from '@controllers/command/command'

import {
  validateData,
  validateDeleteCommand,
  validateEditData,
  validateEditDataCommandAll
} from '@middlewares/validation/validateBody'

import { Router } from 'express'

const RouterCommand = Router()

const path = '/api/v1/command'

RouterCommand.get(`${path}/:id_chat/:name_command`, getCommandByNameBot)
RouterCommand.post(`${path}/:id_chat`, validateData, addCommandBot)
RouterCommand.put(`${path}/:id_chat`, validateEditData, editCommandBot)
RouterCommand.put(
  `${path}/:id_chat/:name/:username`,
  validateEditDataCommandAll,
  editCommandAllBot
)
RouterCommand.delete(
  `${path}/:id_chat`,
  validateDeleteCommand,
  deleteCommandBot
)

export default RouterCommand
