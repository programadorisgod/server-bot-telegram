import { IChat } from "@interfaces/chat.interface";

import Chat from "@models/chat";
import { CustomError } from "@utils/httpError";
import { listCommandsDefault } from "@utils/listCommands";


const findChatById = async (id:string): Promise<IChat | Error> => {
  try {
      const chat = await Chat.findOne({ chatId: id })

      if (!chat) {

        throw chat
       }

      return chat
  } catch (error) {
     throw new CustomError(404, `Chat not found`)
  }

}

const createChat = async (chat:IChat): Promise<IChat|Error> => {

    try {

      chat.list = listCommandsDefault
      const chatCreated = await Chat.create(chat)
      return chatCreated
    } catch (error: any){
        return new CustomError(500, "Error to create chat")
    }
}




export { createChat, findChatById }