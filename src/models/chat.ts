import { type IChatModel } from '@interfaces/chatModel.interface'
import { Schema, model } from 'mongoose'

/**
  {
    chatId: int
    list: [
         {
            type: string,
            name: string,
            command: string,
            description: string,
            creator: string
         }
    ]
    }
 */

const chatSchema: Schema = new Schema({
  chatId: { type: Number, required: true, unique: true },
  list: [
    {
      type: { type: String, required: true },
      name: { type: String, required: true },
      command: { type: String, required: true },
      description: { type: String, required: true },
      creator: { type: String, required: true }
    }
  ]
})

const Chat = model<IChatModel>('Chat', chatSchema)

export default Chat
