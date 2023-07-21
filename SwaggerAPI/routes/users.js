import express from "express";
import User from "../models/User.js";

import{getOne,
  getAll,
  createUser,
  updateUser,
  

} from "../controllers/users.js"

import { verifyUser,
verifyAdmin,
verifyToken } from "../utils/verifytoken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewUser'
 * components:
 *   schemas:
 *     NewUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: Email ID of the user
 *         country:
 *           type: string
 *           description: Location country
 *         city:
 *           type: string
 *           description: city
 *         phone:
 *           type: string
 *           description: phone
 *         password:
 *           type: string
 *           description: password password
 *     OutputUser:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier of the user
 *         username:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: Email ID of the user
 *         country:
 *           type: string
 *           description: Location country
 *         img:
 *           type: string
 *           description: image
 *         city:
 *           type: string
 *           description: city
 *         phone:
 *           type: string
 *           description: phone
 *         password:
 *           type: string
 *           description: password password
 *         isAdmin:
 *           type: string
 *           description: isAdmin isAdmin
 *     UpdateUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: Email ID of the user
 *         country:
 *           type: string
 *           description: Location country
 *         city:
 *           type: string
 *           description: city
 *         phone:
 *           type: string
 *           description: phone
 * securitySchemes:
 *   bearerAuth:            
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT    
 * security:
 *   - bearerAuth: [] 
 */




/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OutputUser'
 */
router.get("/:id",verifyAdmin, getOne);



        
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all user 
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OutputUser'
 */
router.get("", getAll);

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *             
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OutputUser'
 */
router.post("/create",createUser);

/**
 * @swagger
 * /api/users/update/{id}:
 *   post:
 *     summary: Update
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *             
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OutputUser'
 */
router.put("/update/:id", updateUser);

export default router;
