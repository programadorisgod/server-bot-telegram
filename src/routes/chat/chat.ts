/* eslint-disable @typescript-eslint/no-misused-promises */
import { createChatBot, findChatByIdBot } from '@controllers/chat/chat'
import { Router } from 'express'

const routerChat = Router()

const path = '/api/v1/chat'

/**
 * @swagger
 * /api/v1/chat/{id}:
 *   get:
 *     tags:
 *       - Chat
 *     summary: Get chat bot by ID
 *     description: Retrieves a chat bot by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the chat bot to retrieve.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Returns the chat with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/chat'
 *         example:
 *           chatId: 123456
 *           list:
 *             - type: text
 *               name: start
 *               command: " "
 *               description: " "
 *               creator: " "
 *               _id: "65b416a47a5259e3ab6b2411"
 *             - type: text
 *               name: help
 *               command: " "
 *               description: " "
 *               creator: " "
 *               _id: "65b416a47a5259e3ab6b2412"
 *             - type: any
 *               name: purge
 *               command: " "
 *               description: " "
 *               creator: " "
 *               _id: "65b416a47a5259e3ab6b2413"
 *             - type: text
 *               name: alias
 *               command: " "
 *               description: " "
 *               creator: " "
 *               _id: "65b416a47a5259e3ab6b2414"
 *             - type: text
 *               name: remove
 *               command: " "
 *               description: " "
 *               creator: " "
 *               _id: "65b416a47a5259e3ab6b2415"
 *             - type: text
 *               name: risa
 *               command: " "
 *               description: " "
 *               creator: " "
 *               _id: "65b416a47a5259e3ab6b2416"
 *             - type: text
 *               name: all
 *               command: " "
 *               description: " "
 *               creator: " "
 *               _id: "65b416a47a5259e3ab6b2417"
 *             - type: text
 *               name: tr
 *               command: " "
 *               description: " "
 *               creator: " "
 *               _id: "65b416a47a5259e3ab6b2418"
 *       404:
 *         description: Chat not found.
 *       500:
 *         description: ID is malformed.
 */

routerChat.get(`${path}/:id`, findChatByIdBot)
/**
 * @swagger
 * /api/v1/chat:
 *   post:
 *     tags:
 *       - Chat
 *     summary: Create chat bot
 *     description: Create chat bot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/chat'
 *           example:
 *             chatId: 123456
 *     responses:
 *       201:
 *         description: Chat created
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
 */

routerChat.post(path, createChatBot)

export default routerChat
