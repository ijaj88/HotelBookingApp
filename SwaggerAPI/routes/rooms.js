import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/rooms.js";
import { verifyUser,
    verifyAdmin,
    verifyToken } from "../utils/verifytoken.js";

const router = express.Router();

router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
/**
 * @swagger
 * /api/rooms/{hotelid}:
 *   post:
 *     summary: create rooms
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: hotelid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the hotelid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Room'  
 *       
 *             
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/RoomOutput'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 * definitions:
 *   RoomOutput:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: The unique identifier for the room.
 *       title:
 *         type: string
 *         description: The title of the room.
 *       price:
 *         type: number
 *         description: The price of the room.
 *       maxPeople:
 *         type: number
 *         description: The maximum number of people allowed in the room.
 *       desc:
 *         type: string
 *         description: The description of the room.
 *       roomNumbers:
 *         type: array
 *         description: Array of room numbers and their unavailable dates.
 *         items:
 *           type: object
 *           properties:
 *             number:
 *               type: number
 *               description: The room number.
 *             unavailableDates:
 *               type: array
 *               items:
 *                 type: string
 *                 format: date
 *               description: Array of dates when the room is unavailable.
 *   Room:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         description: The title of the room.
 *       price:
 *         type: number
 *         description: The price of the room.
 *       maxPeople:
 *         type: number
 *         description: The maximum number of people allowed in the room.
 *       desc:
 *         type: string
 *         description: The description of the room.
 *       roomNumbers:
 *         type: array
 *         description: Array of room numbers and their unavailable dates.
 *         items:
 *           type: object
 *           properties:
 *             number:
 *               type: number
 *               description: The room number.
 *             unavailableDates:
 *               type: array
 *               items:
 *                 type: string
 *                 format: date
 *               description: Array of dates when the room is unavailable.
 */

router.post("/:hotelid", verifyAdmin, createRoom);


router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//GET
/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: get room 
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of room
 *             
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/RoomOutput'
 */
router.get("/:id", getRoom);
/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Alll rooms
 *     tags: [Rooms]
 *             
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/RoomOutput'
 */
router.get("/", getRooms);

export default router;