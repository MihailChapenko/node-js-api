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

    res.json(user.products)
}

export const getOneProduct = async (req, res) => {
    const product = await db.product.findFirst({
        where: {
            id: req.params.id,
            belongsToId: req.user.id
        }
    })

    res.json({data: product})
}

export const createProduct = async (req, res, next) => {
    try {
        const product = await db.product.create({
            data: {
                belongsToId: req.user.id,
                title: req.body.title
            }
        })

        res.json({data: product});
    } catch (e) {
        next(e)
    }
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
    
    res.json({product: product})
}

export const deleteProduct = async (req, res) => {
    const result = await db.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id,
            }
        }
    })

    res.json({result})
}