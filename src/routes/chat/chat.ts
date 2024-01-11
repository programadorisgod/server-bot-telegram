import { createChatBot } from "@controllers/chat/chat";
import { Router } from "express";

const routerChat = Router()

const path = '/api/v1/chat'


routerChat.post(path, createChatBot)


export default routerChat