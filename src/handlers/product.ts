import db from '../db'

export const getProducts = async (req, res) => {
    const user = await db.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

    res.status(200)
    res.json(user.products)
}

export const getOneProduct = async (req, res) => {
    const product = await db.product.findFirst({
        where: {
            id: req.params.id,
            belongsToId: req.user.id
        }
    })

    res.status(200)
    res.json({data: product})
}

export const createProduct = async (req, res) => {
    const product = await db.product.create({
        data: {
            belongsToId: req.user.id,
            title: req.body.title
        }
    })

    res.status(201);
    res.json({data: product});
}

export const updateProduct = async (req, res) => {
    const product = await db.product.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id,
            }
        },
        data: {
            title: req.body.title
        }
    })

    res.status(200)
    res.json({product: product})
}

export const deleteProduct = async (req, res) => {
    const err = await db.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id,
            }
        }
    })
    if (err === null) {
        res.status(204)
        res.json({message: "product deleted successfully"})
    } else {
        res.status(500)
        res.json({message: "product was not deleted"})
    }
}