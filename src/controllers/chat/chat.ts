import { Request, Response } from 'express';
import { createChat, findChatById } from '@services/chat/createChat';
import { CustomError, HandleError } from '@utils/httpError';
import { IChat } from '@interfaces/chat.interface';

const createChatBot = async (req:Request, res:Response) => {

      try {

         const chat:IChat = req.body

         const chatCreated = await createChat(chat)

         res.status(201).json({chatCreated})

      } catch (error: CustomError | any) {

         HandleError(error, res)
         
      }
}

const findChatByIdBot =async (req:Request, res:Response) => {
     try {

       const { id } = req.params
       
       const chat = await findChatById(id)

       res.status(200).json({chat})

     } catch (error:CustomError | any) {
       HandleError(error, res)
     }
}




export { createChatBot, findChatByIdBot }