import { type IChat } from '@interfaces/chat.interface'
import { type IChatModel } from '@interfaces/chatModel.interface'

import Chat from '@models/chat'
import { CustomError } from '@utils/httpError'
import { listCommandsDefault } from '@utils/listCommands'

const findChatById = async (id: string): Promise<IChat | Error> => {
  try {
    const chat: IChat | null = await Chat.findOne({ chatId: id })

    if (chat === null || chat === undefined) {
      throw new CustomError(404, 'Chat not found')
    }

    return chat
  } catch (error) {
    if (error instanceof CustomError) {
      throw error
    }
    throw new CustomError(500, 'Id is malformed')
  }
}

const createChat = async (chat: IChat): Promise<IChat | Error> => {
  try {
    const chatExist: IChat | Error | null = await Chat.findOne({
      chatId: chat.chatId
    })

    if (chatExist !== null) {
      throw new CustomError(400, 'Chat already exist')
    }

    chat.list = listCommandsDefault

    const chatCreated: IChatModel = await Chat.create(chat)

    return chatCreated
  } catch (error) {
    if (error instanceof CustomError) throw error
    throw new CustomError(500, 'Error to create chat')
  }
}

export { createChat, findChatById }
