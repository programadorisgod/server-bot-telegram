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

import { ICommand } from "@interfaces/command.interface"

export interface IChat {
    [x: string]: any
    chatId:number
    list: Array<ICommand>
}