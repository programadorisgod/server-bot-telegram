import { HandleError } from '@utils/httpError'
import { type NextFunction, type Request, type Response } from 'express'
import { ZodError, z } from 'zod'

const Bot = z.object({
  type: z.string().min(1, { message: 'Must be 1 or more characters long' }),
  name: z.string().min(1, { message: 'Must be 1 or more characters long' }),
  command: z.string().min(1, { message: 'Must be 1 or more characters long' }),
  description: z
    .string()
    .min(1, { message: 'Must be 1 or more characters long' }),
  creator: z.string().min(1, { message: 'Must be 1 or more characters long' })
})

const requieredBot = Bot.required({
  type: true,
  name: true,
  command: true,
  description: true,
  creator: true
})

export const validateData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await requieredBot.parseAsync(req.body)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      void HandleError(error, res)
    }
  }
}
