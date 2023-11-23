import express from "express"

import {
    updateImage,
    getAllUsers,
    getUser
  } from "../controllers/user.js";
  
  const router = express.Router();
  
  router.put("/image/:id", updateImage);
  router.get("/", getAllUsers);
  router.get("/:id", getUser);

export default router