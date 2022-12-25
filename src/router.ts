import {Router} from 'express'
import {body, validationResult} from "express-validator";
import {handleInputErrors} from "./modules/middleware";
import {UPDATE_STATUS} from "@prisma/client";
import {
    createProduct,
    deleteProduct,
    getOneProduct,
    getProducts,
    updateProduct
} from "./handlers/product";

const router = Router()

/**
 * Product
 */
router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.post("/product", body("name").isString(), handleInputErrors, createProduct);

router.put("/product/:id", body("name").isString(), handleInputErrors, updateProduct);

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", (req, res) => {
});

router.get("/update/:id", (req, res) => {
});

router.post("/update",
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("status").isIn([UPDATE_STATUS]),
    (req, res) => {
    });

router.put("/update/:id",
    body("title").optional(),
    body("body").optional(),
    body("status").isIn([UPDATE_STATUS]),
    body("version").optional(),
    (req, res) => {
    });

router.delete("/update/:id", (req, res) => {
});

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

export default router;