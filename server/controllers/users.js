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
      //   res.status(200).json({ result: user })
      // console.log(user.name)
        res.status(200).json({name: user.name, userId: user._id, joined: user.createdAt, city: user.city, state: user.state, 
         address: user.address, activeRequest: user.activeRequest, books: user.books, });
    } catch (error) {
      res.status(404).json(error);
    }
};

export const updateUserProfile = async(req, res) =>{
    const { body: { name, city, state, address }, params: { id }} = req;
    try {
      console.log({id, name, city, state, address})
      //   if (taskName === '' || status === '') return res.status(400).json({msg: 'Please fill in required fields'});
      //   const task = await Task.findByIdAndUpdate({ _id: taskId, createdBy: userId}, { taskName, status}, {new: true, runValidators: true})
      //   if (!task) return res.status(400).json({msg: 'No task with this Id'});
      //   res.status(200).json({ task });
    } catch (error) { 
        res.status(400).json(error);
    }
};