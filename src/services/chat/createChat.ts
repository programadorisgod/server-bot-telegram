import { type IChat } from '@interfaces/chat.interface'
import { type IChatModel } from '@interfaces/chatModel.interface'

import Chat from '@models/chat'
import { CustomError } from '@utils/httpError'
import { listCommandsDefault } from '@utils/listCommands'

const findChatById = async (id: string): Promise<IChat | Error> => {
  const chat: IChat | null = await Chat.findOne({ chatId: id })

  if (chat === null) {
    throw new CustomError(404, 'Chat not found')
  }

  return chat
}

const createChat = async (chat: IChat): Promise<IChat | Error> => {
  try {
    chat.list = listCommandsDefault
    const chatCreated: IChatModel = await Chat.create(chat)
    return chatCreated
  } catch (error: any) {
    throw new CustomError(500, 'Error to create chat')
  }
}

export { createChat, findChatById }
