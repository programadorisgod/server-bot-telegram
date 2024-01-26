import { type IChat } from '@interfaces/chat.interface'
import { type ICommand } from '@interfaces/command.interface'
import Chat from '@models/chat'
import { findChatById } from '@services/chat/createChat'
import { CustomError } from '@utils/httpError'
import { listCommandsDefault } from '@utils/listCommands'

const getCommandByName = async (
  idChat: string,
  nameCommand: string
): Promise<ICommand | Error> => {
  const chat = await findChatById(idChat)

  if (chat instanceof Error) {
    throw chat
  }

  const command = chat.list.find((c) => c.name === nameCommand)

  if (command === null || command === undefined) {
    throw new CustomError(404, 'Command not Found')
  }

  return command
}

const addCommand = async (
  id: string,
  command: ICommand
): Promise<Record<string, unknown> | Error> => {
  try {
    const chat = await findChatById(id)

    if (chat instanceof Error) {
      throw chat
    }

    const findCommand = chat.list.find((c: ICommand) => c.name === command.name)
    if (findCommand !== undefined) {
      throw new CustomError(409, 'The command already exists')
    }
    chat.list.push(command)

    chat.save()

    return { message: 'Command Created' }
  } catch (error) {
    const newChat: IChat = {
      chatId: parseInt(id),
      list: listCommandsDefault
    }

    const newChatCreated = await Chat.create(newChat)

    newChatCreated.list.push(command)
    await newChatCreated.save()

    return { message: 'Command Created' }
  }
}

const editCommand = async (
  id: string,
  description: string,
  name: string
): Promise<IChat | Error> => {
  const chat = await findChatById(id)

  if (chat instanceof Error) {
    throw chat
  }

  const command = chat.list.find((command) => command.name === name)

  if (command === null || command === undefined) {
    throw new CustomError(404, 'Command not found')
  }

  command.description = description

  await chat?.save()

  return chat
}

const editCommandAll = async (
  id: string,
  nameCommand: string,
  username: string
): Promise<Record<string, unknown> | Error> => {
  const chat = await findChatById(id)

  if (chat instanceof Error) {
    throw chat
  }

  const command = chat?.list.find((c) => c.name === nameCommand)

  if (command === null || command === undefined) {
    throw new CustomError(403, 'Command not allowed')
  }

  const usersCommandAll = command.command.split(' ')

  const userFind = usersCommandAll.findIndex((u) => u === username)

  if (userFind === -1) {
    usersCommandAll.push(username)

    command.command = usersCommandAll.join(' ')

    await chat?.save()

    return { message: 'username added' }
  } else {
    throw new CustomError(304, 'username not added')
  }
}

const deleteCommand = async (
  id: string,
  name: string
): Promise<Error | Record<string, unknown>> => {
  const chat = await findChatById(id)

  if (chat instanceof Error) throw chat

  const command = chat.list.find((command) => command.name === name)

  if (command === null || command === undefined) {
    throw new CustomError(404, 'Command not found')
  }

  const commandFilter = chat.list.filter((command) => command.name !== name)

  chat.list = commandFilter

  await chat.save()

  return { message: 'Command deleted' }
}

export {
  editCommand,
  addCommand,
  deleteCommand,
  editCommandAll,
  getCommandByName
}
