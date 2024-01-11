import { Response } from "express";
class CustomError extends Error {
    _code: number
    _message: string 

    constructor(code: number, message: string){
        super(message)
        this._code = code,
        this._message = message
    }

}



const HandleError = (error: CustomError , res: Response) => {
    if (error instanceof CustomError) {
        console.log(error._message)
        res.status(error._code).json({error: error._message})
    }else{
        res.status(500).json({error: "Internal server error"})
    }
}

export {CustomError, HandleError}