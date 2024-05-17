import express, { Application, Request, Response } from 'express'
import colors from 'colors'
import bodyParser from 'body-parser'
const app: Application = express()
const port: number = parseInt(process.env.PORT) || 4000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Welcome to the server' })
})
app.listen(port, () => {
  console.log(colors.green(`Server listening on http://localhost:${port}`))
})
