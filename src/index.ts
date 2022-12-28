import * as dotenv from 'dotenv'
dotenv.config()

import app from './server'

app.listen(3001, () => {
    console.log('hello on http://localhost:3001')
})

process.on('uncaughtException', () => {
    console.log("handle thrown errors")
})

process.on('unhandledRejection', () => {
    console.log("handle async errors")
})