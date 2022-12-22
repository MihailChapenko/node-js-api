import jwt from 'jsonwebtoken'

export const createJWT = (user) => {
    const token = jwt.sign({
            id: user.id,
            username: user.username,
            // date: Date.now()
        },
        process.env.JWT_SECRET
    )
    return token
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization
    if (!bearer) {
        res.status(401)
        res.json({message: "not authorized"})
        return
    }

    const [, token] = bearer.split(" ")
    if (!token) {
        res.status(401)
        res.json({message: "not authorized"})
        return
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        console.log(payload)
        next()
        return
    } catch (e) {
        console.log(e)
        res.status(401)
        res.json({message: "not authorized"})
        return
    }
}