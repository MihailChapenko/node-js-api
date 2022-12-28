import {Router} from 'express'
import {body, validationResult} from "express-validator";
import {handleInputErrors} from "./modules/middleware";
import {UPDATE_STATUS} from "@prisma/client";
import {createProduct, deleteProduct, getOneProduct, getProducts, updateProduct} from "./handlers/product";
import {createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate} from "./handlers/update";

const router = Router()

/**
 * Product
 */
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.post("/product",
    body("title").isString(),
    handleInputErrors,
    createProduct);
router.put("/product/:id",
    body("title").isString(),
    handleInputErrors,
    updateProduct);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */
router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.post("/update",
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("productId").exists().isString(),
    handleInputErrors,
    createUpdate);
router.put("/update/:id",
    body("title").optional(),
    body("body").optional(),
    body("status").optional(),
    body("version").optional(),
    handleInputErrors,
    updateUpdate);
router.delete("/update/:id", deleteUpdate);

/**
 * UpdatePoint
 */
router.get("/updatepoint", (req, res) => {
});

router.get("/updatepoint/:id",
    body('title').optional().isString(),
    body('description').optional().isString(),
    (req, res) => {
    });

router.post("/updatepoint",
    body('title').isString(),
    body('description').isString(),
    body('updateId').exists().isNumeric(),
    (req, res) => {
    });

router.put("/updatepoint/:id", (req, res) => {
});

router.delete("/updatepoint/:id", (req, res) => {
});

router.use((err, req, res, next) => {
    console.log(err)
})

export default router;