import { createServer, type AddressInfo } from 'node:net'

export async function findPort(
  disaredPort: number | string
): Promise<number | string> {
  return await new Promise((resolve, reject) => {
    const server = createServer()

    server.listen(disaredPort, () => {
      const { port } = server.address() as AddressInfo
      server.close(() => {
        resolve(port)
      })
    })

    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        resolve(0)
      } else {
        reject(error)
      }
    })
  })
}
