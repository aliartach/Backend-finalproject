import express from "express";
import { addCartItem } from "../Controllers/cartController.js";

const router = express.Router();

router.post('/add', addCartItem);

export default router
