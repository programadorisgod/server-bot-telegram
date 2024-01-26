import mongoose, { connect } from 'mongoose'
import { config } from 'dotenv'
import 'colors'

config()

const DB_URI = process.env.DB_URI ?? ''
export const connectionDatabase = async (): Promise<void> => {
  try {
    await connect(DB_URI)
    console.log('[INFO]: Connected to database'.green)
  } catch (error) {
    console.log('[ERROR]: Error to connect to database'.red, error)
  }
}
const closeConnectionDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect()
    console.log('[INFO]: closed conexion string ')
  } catch (error) {
    console.log('[ERROR:]:', error)
  }
}

export default closeConnectionDatabase
