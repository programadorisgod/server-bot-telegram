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

const requiredEditBot = Bot.pick({
  name: true,
  description: true
}).required()

const requiredEditAllBot = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Must be 1 or more characters long' }),
    name: z.string().min(1, { message: 'Must be 1 or more characters long' })
  })
  .required()

const requiredDeleteCommand = z
  .object({
    name: z.string().min(1, { message: 'Must be 1 or more characters long' })
  })
  .required()

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

export const validateEditData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await requiredEditBot.parseAsync(req.body)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      void HandleError(error, res)
    }
  }
}

export const validateEditDataCommandAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await requiredEditAllBot.parseAsync(req.params)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      void HandleError(error, res)
    }
  }
}

export const validateDeleteCommand = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await requiredDeleteCommand.parseAsync(req.body)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      void HandleError(error, res)
    }
  }
}
