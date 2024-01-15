import { type ICommand } from '@interfaces/command.interface'
import {
  addCommand,
  deleteCommand,
  editCommand,
  editCommandAll
} from '@services/command/command'
import { CustomError, HandleError } from '@utils/httpError'
import { type Request, type Response } from 'express'

const addCommandBot = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const command: ICommand = req.body

    const chatEdited = await addCommand(id, command)

    res.status(200).json(chatEdited)
  } catch (error: unknown) {
    if (error instanceof Error || error instanceof CustomError) {
      HandleError(error, res)
    }
  }
}
const editCommandBot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { description, name } = req.body

    const chat = await editCommand(id, description, name)

    res.status(200).json({ chat })
  } catch (error: unknown) {
    if (error instanceof Error || error instanceof CustomError) {
      HandleError(error, res)
    }
  }
}

const editCommandAllBot = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, nameCommand, username } = req.params

    const chat = await editCommandAll(id, nameCommand, username)

    res.status(201).json(chat)
  } catch (error: unknown) {
    if (error instanceof Error || error instanceof CustomError) {
      HandleError(error, res)
    }
  }
}

const deleteCommandBot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { name } = req.body

    const commandDeleted = await deleteCommand(id, name)
    res.status(200).json(commandDeleted)
  } catch (error: unknown) {
    if (error instanceof Error || error instanceof CustomError) {
      HandleError(error, res)
    }
  }
}

export { editCommandBot, addCommandBot, deleteCommandBot, editCommandAllBot }
