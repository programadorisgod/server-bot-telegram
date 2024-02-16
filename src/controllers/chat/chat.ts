import { type Request, type Response } from 'express'
import { createChat, findChatById } from '@services/chat/createChat'
import { HandleError } from '@utils/httpError'
import { type IChat } from '@interfaces/chat.interface'

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

    const chat = await findChatById(id)

    res.status(200).json(chat)
  } catch (error: unknown) {
    if (error instanceof Error) {
      await HandleError(error, res)
    }
  }
}

export { createChatBot, findChatByIdBot }
