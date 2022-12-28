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
    throw new Error("Some error")
})

app.use('/api', protect, router)

app.post("/register", createNewUser);
app.post("/signin", signIn);

app.use((err, req, res, next) => {
    if (err.type === "auth") {
        res.status(401);
        res.json({ message: "nope" });
    }

    if (err.type === 'input') {
        res.status(400)
        res.json({message:'invalid input'})
    }

    res.status(500)
    res.json({message: "opps... That's on us"})
})

export default app