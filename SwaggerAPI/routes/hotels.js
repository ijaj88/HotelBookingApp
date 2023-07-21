import express from "express";
import Hotel from "../models/Hotel.js";

import {getOne,
    getAll,
    DeleteHotel,
    UpdateHotel,
    CreateHotel,
    getHotels,
    countByCity,
    countByType,
    getHotelRooms,
    getHotel,

} from "../controllers/hotels.js"

const router = express.Router();


router.get("/find/:id", getHotel);

router.get("/countByCity", countByCity);


router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

router.get("/",getHotels);
router.get("/all",getHotels);

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: API endpoints for managing hotels
 */
/**

/**
 * @swagger
 * /api/hotels/{id}:
 *   get:
 *     summary: Get a hotel by ID
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the hotel
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/HotelOutput'

* definitions:
*  HotelOutput:
*    type: object
*    properties:
*      _id:
*        type: string
*        description: The unique identifier for the hotel.
*      name:
*        type: string
*        description: The name of the hotel.
*      type:
*        type: string
*        description: The type or category of the hotel.
*      city:
*        type: string
*        description: The city where the hotel is located.
*      address:
*        type: string
*        description: The address of the hotel.
*      distance:
*        type: string
*        description: The distance of the hotel from a certain point.
*      photos:
*        type: array
*        description: The photos of the hotel from a certain point.
*      title:
*        type: string
*        description: The title or headline of the hotel.
*      desc:
*        type: string
*        description: The description or details about the hotel.
*      rating:
*        type: number
*        description: The rating of the hotel on a scale of 0 to 5.
*      rooms:
*        type: array
*        description: The cheapest price for a room in the hotel.
*      cheapestPrice:
*        type: number
*        description: The cheapest price for a room in the hotel.
*      featured:
*        type: boolean
*        description: Indicates whether the hotel is featured or not.
*  HotelCreateRequest:
*    type: object
*    properties:
*      name:
*        type: string
*        description: The name of the hotel.
*      type:
*        type: string
*        description: The type or category of the hotel.
*      city:
*        type: string
*        description: The city where the hotel is located.
*      address:
*        type: string
*        description: The address of the hotel.
*      distance:
*        type: string
*        description: The distance of the hotel from a certain point.
*      title:
*        type: string
*        description: The title or headline of the hotel.
*      desc:
*        type: string
*        description: The description or details about the hotel.
*      cheapestPrice:
*        type: number
*        description: The cheapest price for a room in the hotel.
*
*  HotelUpdateRequest:
*    type: object
*    properties:
*      name:
*        type: string
*        description: The name of the hotel.
*      distance:
*        type: string
*        description: The distance of the hotel from a certain point.
*      desc:
*        type: string
*        description: The description or details about the hotel.
*      cheapestPrice:
*        type: number
*        description: The cheapest price for a room in the hotel.
*/

router.get("/:id", getOne);





/**
 * @swagger
 * /api/hotels/create:
 *   post:
 *     summary: Create a new hotel
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/HotelCreateRequest'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/HotelOutput'
 */
router.post("/create",CreateHotel );
/**
 * @swagger
 * /api/hotels/all:
 *   get:
 *     summary: Get all hotels
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/HotelOutput'
 */
router.get("/all",getAll);



/**
 * @swagger
 * /api/hotels/update/{id}:
 *   put:
 *     summary: Update a hotel by ID
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the hotel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/HotelUpdateRequest'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/definitions/HotelOutput'
 */
router.put("/update/:id",UpdateHotel);

/**
 * @swagger
 * /api/hotels/delete/{id}:
 *   delete:
 *     summary: Delete a hotel by ID
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the hotel
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Hotel has been deleted.
 */
router.delete("/delete/:id", DeleteHotel);





export default router;