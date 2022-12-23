import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import {protect} from "./modules/auth";
import {createNewUser, signIn} from "./handlers/user";

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    //some job...
    next()
})

app.get('/', (req, res) => {
    console.log("hello from express")
    res.status(200)
    res.json({message: "hello"})
})

app.post("/register", createNewUser);
app.post("/signin", signIn);
app.use('/api', protect, router)

export default app