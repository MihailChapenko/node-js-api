import db from "../db";

export const getUpdates = async (req, res) => {
    const products = await db.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    res.status(200)
    res.json({data: updates})
}

export const getOneUpdate = async (req, res) => {
    const update = await db.update.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.status(200)
    res.json(update)
}

export const updateUpdate = async (req, res) => {
    const products = await db.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        res.json({message: 'nope'})
    }

    const updatedUpdate = await db.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({data: updatedUpdate})
}

export const createUpdate = async (req, res) => {
    const product = await db.product.findUnique({
        where: {
            id: req.body.id
        }
    })

    if (!product) {
        res.json({message: 'nope'})
    }

    const update = await db.update.create({
        data: req.body
    })

    res.json({data: update})
}

export const deleteUpdate = async (req, res) => {
    const products = await db.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        res.json({message: 'nope'})
    }

    const result = db.update.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({result})
}