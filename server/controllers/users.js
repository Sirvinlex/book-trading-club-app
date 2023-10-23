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

export const getUserDetails = async (req, res) =>{
   const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json({ result: user })
        console.log(user)
        res.status(200).json({name: user.name, userId: user._id, token, joined: user.createdAt, city: user.city, state: user.state, 
        address: user.address, activeRequest: user.activeRequest, books: user.books, });
      //   res.status(200).json(post);
    } catch (error) {
      res.status(404).json(error);
    }
}