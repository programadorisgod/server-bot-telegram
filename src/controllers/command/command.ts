import { addCommand, deleteCommand, editCommand, editCommandAll } from "@services/command/command"
import { CustomError, HandleError } from "@utils/httpError"
import { Request, Response } from "express"


const addCommandBot = async( req:Request, res:Response ) => {
  try {

     const { id } = req.params
     const command = req.body
     
     const chatEdited = await addCommand( id , command )

     res.status(200).json(chatEdited)

  } catch (error: CustomError | any) {    
    HandleError(error, res)
  }
}
const editCommandBot = async ( req:Request, res:Response ) => {
  try {

    const { id } = req.params
    const { description, name } = req.body

    const chat = await editCommand( id, description, name )
     
    res.status(200).json({chat})


  } catch (error: CustomError | any) {
    HandleError(error, res)
  }
}

const editCommandAllBot = async(req:Request, res:Response) => {
  try {
    const { id, nameCommand, username } = req.params
    
    const chat = await editCommandAll( id, nameCommand, username )
    
    res.status(201).json(chat)
  } catch (error: CustomError | any) {
    HandleError(error, res)
  }
}

const deleteCommandBot = async (req:Request, res:Response) => {
  try{

     const {id} = req.params
     const {name} = req.body

     const commandDeleted = await deleteCommand(id, name)
     res.status(200).json(commandDeleted)
    
  }catch (error: CustomError | any){
    HandleError(error, res)
  }
}

export { editCommandBot, addCommandBot, deleteCommandBot, editCommandAllBot }