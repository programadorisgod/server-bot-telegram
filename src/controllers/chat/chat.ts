import { type Request, type Response } from 'express'
import { createChat, findChatById } from '@services/chat/createChat'
import { HandleError } from '@utils/httpError'
import { type IChat } from '@interfaces/chat.interface'
import redis from '@utils/cacheInit'

const createChatBot = async (req: Request, res: Response): Promise<void> => {
  try {
    const chat: IChat = req.body

    const chatCreated = await createChat(chat)

    res.status(201).json({ chatCreated })
  } catch (error: unknown) {
    if (error instanceof Error) {
      await HandleError(error, res)
    }
  }
}

const findChatByIdBot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const cacheData = await redis.get('cachedData')

    if (cacheData != null) {
      res.status(200).json(JSON.parse(cacheData))
    } else {
      const chat = await findChatById(id)
      await redis.set('cachedData', JSON.stringify(chat))
      await redis.expire('cachedData', 60)

      res.status(200).json(chat)
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      await HandleError(error, res)
    }
  }
}

export { createChatBot, findChatByIdBot }
