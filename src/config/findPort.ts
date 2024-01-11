import {createServer, AddressInfo} from 'node:net'

export function findPort(disaredPort:number | string): Promise<number | string > {
  return new Promise ((resolve, rejected) => {
     const server = createServer()

     server.listen(disaredPort, () => {
        const { port } = server.address() as AddressInfo
        server.close( () => resolve(port))
     })

    server.on('error', (error:NodeJS.ErrnoException) => {
       if (error.code === 'EADDRINUSE') {
          resolve(0)
       }else{
         rejected(error)
       }
    })

  })   
}