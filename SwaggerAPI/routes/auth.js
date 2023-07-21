import express from "express";
import User from "../models/User.js";
import { register,login } from "../controllers/auth.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authorize
 *   description: API endpoints for managing users
 * 
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Authorize]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCustomer'
 *             
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OutputCustomer'
 * components:
 *   schemas:
 *     NewCustomer:
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
 *     OutputCustomer:
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
 *     LogIn:
 *       type: object
 *       properties:
 *          username:
 *           type: string
 *           description: Name of the user
 *          password:
 *           type: string
 *           description: password password
 */


router.post("/register", register );

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: log in
 *     tags: [Authorize]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogIn'
 *             
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OutputCustomer'
 * 
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               description: Access token cookie
 */
 
router.post("/login",login);
export default router;
