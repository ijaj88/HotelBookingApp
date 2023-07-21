import express, { query } from "express";
import Hotel from "../models/Hotel.js";
import Rooms from "../models/Rooms.js"




export const getOne = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      res.status(200).json(hotel);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  export const getHotel = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      res.status(200).json(hotel);
    } catch (err) {
      next(err);
    }
  };

  export const getHotels = async (req, res, next) => {
    const { min, max, city } = req.query;
    console.log(req.query);
    try {
      const limit = req.query.limit ?? 0; // Set default limit to 0 if it's not provided in the query
      const featured = req.featured ?? false;
      
      const query = {
        featured: featured,
        cheapestPrice: { $gt: min || -1, $lt: max || 99999 },
      };
  
      if (city) {
        query.city = city;
      }
      
      const hotels = await Hotel.find(query).limit(limit);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };
  
  
  
  export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };
  export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartments" });
      const resortCount = await Hotel.countDocuments({ type: "resorts" });
      const villaCount = await Hotel.countDocuments({ type: "villas" });
      const cabinCount = await Hotel.countDocuments({ type: "star 5" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "star 5", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  };
  
  export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Rooms.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };
  export const getAll =  async (req, res) => {
    try {
      const savedHotel = await Hotel.find();
      res.status(200).json(savedHotel);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  export const CreateHotel=  async (req, res) => {
    const newHotel = new Hotel(req.body);
  
    try {
      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
    } catch (err) {
      res.status(500).json(err);
    }
  };


  export const UpdateHotel =  async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};



export const DeleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};






 