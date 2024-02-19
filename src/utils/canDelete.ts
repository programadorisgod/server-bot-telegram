import { type ICommand } from '@interfaces/command.interface'

export default function canDelete(
  role: string,
  command?: ICommand,
  username?: string
): boolean {
  if (role === 'admin') {
    return true
  }

  if (
    role !== 'admin' &&
    command?.creator !== undefined &&
    username !== undefined &&
    command.creator === username
  ) {
    return true
  }
  return false
}
