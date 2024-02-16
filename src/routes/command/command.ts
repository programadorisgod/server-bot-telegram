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

/**
 * GET /api/v1/command/:id_chat/:name_command
 * @swagger
 * /command/{id_chat}/{name_command}:
 *  get:
 *   tags:
 *    - Command
 *   summary: Get command by name
 *   description: Get command by name
 *   parameters:
 *     - in: path
 *       name: id_chat
 *       required: true
 *       schema:
 *         type: number
 *       description: chat id
 *     - in: path
 *       name: name_command
 *       required: true
 *       schema:
 *         type: string
 *       description: command name
 *   responses:
 *    200:
 *     description: Returns the command with the specified name.
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/command'
 *         example:
 *           command: start
 *           description: " "
 *           creator: " "
 *           _id: "65b416a47a5259e3ab6b2411"
 *    404:
 *     description: Command not found
 */

/**
 * POST /api/v1/command/:id_chat
 * @swagger
 * /command/{id_chat}:
 *   post:
 *     tags:
 *       - Command
 *     summary: Add command
 *     description: Add command
 *     parameters:
 *       - in: path
 *         name: id_chat
 *         required: true
 *         schema:
 *           type: number
 *         description: chat id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/command'
 *           example:
 *             name: "prueba"
 *             description: " "
 *             type: " "
 *             command: " "
 *             creator: " "
 *     responses:
 *       200:
 *         description: Returns the chat with the new command added.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/chat'
 *             example:
 *               chatId: 123456
 *               list:
 *                 - type: text
 *                   name: start
 *                   command: " "
 *                   description: " "
 *                   creator: " "
 *                   _id: "65b416a47a5259e3ab6b2411"
 *                 - type: text
 *                   name: help
 *                   command: " "
 *                   description: " "
 *                   creator: " "
 *                   _id: "65b416a47a5259e3ab6b2412"
 *                 - type: any
 *                   name: purge
 *                   command: " "
 *                   description: " "
 *                   creator: " "
 *                   _id: "65b416a47a5259e3ab6b2413"
 *                 - type: text
 *                   name: alias
 *                   command: " "
 *                   description: " "
 *                   creator: " "
 *                   _id: "65b416a47a5259e3ab6b2414"
 *                 - type: text
 *                   name: remove
 *                   command: " "
 *                   description: " "
 *                   creator: " "
 *                   _id: "65b416a47a5259e3ab6b2415"
 *                 - type: text
 *                   name: risa
 *                   command: " "
 *                   description: " "
 *                   creator: " "
 *                   _id: "65b416a47a5259e3ab6b2416"
 *                 - type: text
 *                   name: all
 *                   command: " "
 *                   description: " "
 *                   creator: " "
 *                   _id: "65b416a47a5259e3ab6b2417"
 *                 - type: text
 *                   name: tr
 *                   command: " "
 *                   description: " "
 *                   creator: " "
 *                   _id: "65b416a47a5259e3ab6b2418"
 *       404:
 *         description: Command not found
 *       409:
 *         description: Command already exists
 *       500:
 *         description: Internal server error
 */

/**
 * PUT /api/v1/command/:id_chat
 * @swagger
 * /command/{id_chat}:
 *   put:
 *     tags:
 *       - Command
 *     summary: Edit command
 *     description: Edit command
 *     parameters:
 *       - in: path
 *         name: id_chat
 *         required: true
 *         schema:
 *           type: number
 *         description: chat id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/command'
 *           example:
 *             name: "start"
 *             description: "editada"
 *     responses:
 *       200:
 *         description: Returns the chat with the command edited.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/chat'
 *             example:
 *               chatId: 123456
 *               list:
 *                 - type: text
 *                   name: start
 *                   command: " "
 *                   description: "editada"
 *                   creator: " "
 *                   _id: "65b416a47a5259e3ab6b2411"
 *       404:
 *         description: Command not found or chat not found
 *       500:
 *         description: Internal server error
 */

/**
 * PUT /api/v1/command/:id_chat/:name/:username
 * @swagger
 * /command/{id_chat}/{name}/{username}:
 *   put:
 *     tags:
 *       - Command
 *     summary: Edit command all
 *     description: Edit command all
 *     parameters:
 *       - in: path
 *         name: id_chat
 *         required: true
 *         schema:
 *           type: number
 *         description: chat id
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: command name
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: username
 *     responses:
 *       200:
 *         description: Returns the chat with the command edited.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/chat'
 *             example:
 *               message: username added
 *       404:
 *         description: Chat not found
 *       403:
 *         description: Command not allowed
 *       400:
 *         description: Command not valid or username not added
 */
/**
 * DELETE /api/v1/command/:id_chat
 * @swagger
 * /command/{id_chat}:
 *   delete:
 *     tags:
 *       - Command
 *     summary: Delete command
 *     description: Delete command
 *     parameters:
 *       - in: path
 *         name: id_chat
 *         required: true
 *         schema:
 *           type: number
 *         description: chat id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/command'
 *           example:
 *             name: "start"
 *     responses:
 *       200:
 *         description: Returns the chat with the command deleted.
 *         content:
 *           application/json:
 *             example:
 *               message: "command deleted"
 *       404:
 *         description: Command not found or chat not found
 *       500:
 *         description: Internal server error
 */
