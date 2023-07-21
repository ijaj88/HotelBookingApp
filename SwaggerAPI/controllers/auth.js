import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const newUser = new User({
        ...req.body,
        password: hash,
      });
  
      await newUser.save();
      res.status(200).send("User has been created.");
    } catch (err) {
        res.status(500).json(err);
    }

}

export const login = async(req,res,next) =>{

    try{
        const user = await User.findOne({username:req.body.username});
        console.log(user)
        if(!user)
        {
            res.status(404).json('User not Found')
            return 
        }
        const isPasswordValid = await  bcrypt.compare(req.body.password,user.password);
        console.log(req.body.password,user.password,isPasswordValid);
        if(!isPasswordValid)
        {
            res.status(401).json("Unauthorized")
            return
        }
        
        const {password,isAdmin,...otherDetails} = user._doc;

        const token = jwt.sign({id:user._id,
            isAdmin:user.isAdmin},process.env.JWT
        )

        res.cookie("access_token",token,{
            httpOnly: true,
        })
        .status(200).json({details:{...otherDetails},isAdmin,token,
            message: "Login Successful"});

    }catch(err)
    {
        res.status(500).json(err);
    }

}