/* eslint-disable @typescript-eslint/naming-convention */
import { type ICommand } from '@interfaces/command.interface'
import {
  addCommand,
  deleteCommand,
  editCommand,
  editCommandAll,
  getCommandByName
} from '@services/command/command'
import { HandleError } from '@utils/httpError'

import { type Request, type Response } from 'express'

const getCommandByNameBot = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id_chat, name_command } = req.params
    const command = await getCommandByName(String(id_chat), name_command)
    res.status(200).json({ command })
  } catch (error) {
    if (error instanceof Error) {
      await HandleError(error, res)
    }
  }
}

const addCommandBot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_chat } = req.params
    const command: ICommand = req.body

    const chatEdited = await addCommand(String(id_chat), command)

    res.status(200).json(chatEdited)
  } catch (error) {
    if (error instanceof Error) {
      await HandleError(error, res)
    }
  }
}
const editCommandBot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_chat } = req.params
    const { description, name } = req.body

    const chat = await editCommand(
      String(id_chat),
      String(description),
      String(name)
    )

    res.status(200).json({ chat })
  } catch (error: unknown) {
    if (error instanceof Error) {
      await HandleError(error, res)
    }
  }
}

const editCommandAllBot = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id_chat, name, username } = req.params

    const chat = await editCommandAll(String(id_chat), name, username)
    res.status(201).json(chat)
  } catch (error: unknown) {
    if (error instanceof Error) {
      await HandleError(error, res)
    }
  }
}

const deleteCommandBot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_chat, username, role } = req.params

    const { name } = req.body

    const commandDeleted = await deleteCommand(
      id_chat,
      String(name),
      username,
      role
    )
    res.status(200).json(commandDeleted)
  } catch (error: unknown) {
    if (error instanceof Error) {
      await HandleError(error, res)
    }
  }
}

export {
  editCommandBot,
  addCommandBot,
  deleteCommandBot,
  editCommandAllBot,
  getCommandByNameBot
}
