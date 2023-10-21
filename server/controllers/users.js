import User from "../models/auth.js";

export const getUsers = async (req, res) =>{
   const { page } = req.query;
   try {
       const users = await User.find();
    //    console.log(users)  
       res.status(200).json({ result: users })
   } catch (error) {
    //    res.status(404).json({message: error.message})
       res.status(404).json(error)
   }
};