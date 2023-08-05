import express from "express";
import {
  createMenu,
  deleteMenu,
  getMenu,
  getMenus,
  updateMenu,
  getCategoriesByRestoranName,
} from "../controllers/menu.js";

const router = express.Router();

//CREATE
router.post("/", createMenu);
//UPDATE
router.put("/:id", updateMenu);
//DELETE
router.delete("/:id", deleteMenu);
//GET
router.get("/find/:id", getMenu);
//GET ALL
router.get("/", getMenus);

router.get("/categories/:restoranName", getCategoriesByRestoranName);

export default router;
