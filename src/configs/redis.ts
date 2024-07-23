import { createClient } from 'redis'

// eslint-disable-next-line @typescript-eslint/typedef
const redisClient = createClient({})

redisClient.on('error', (err: Error): void => {
  console.log(err)
  console.log('Redis Client Error')
  process.exit(1)
})

redisClient.on('connect', (): void => {
  console.log('Redis plugged in.')
})
;(async (): Promise<void> => {
  await redisClient.connect()
})()

export default redisClient
