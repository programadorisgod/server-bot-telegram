import { Request, Response } from 'express';
import { createChat } from '@services/chat/createChat';
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




export {createChatBot}